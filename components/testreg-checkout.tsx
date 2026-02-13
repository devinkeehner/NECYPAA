"use client"

import { useCallback, useEffect, useState } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startTestregCheckout } from "@/app/actions/testreg"
import { Button } from "@/components/ui/button"
import {
  REGISTRATION_PRODUCTS,
  BREAKFAST_PRODUCTS,
  calculateProcessingFee,
} from "@/lib/registration-products"
import type { BreakfastSelections } from "@/components/breakfast-ticket-selector"

interface RegistrationData {
  name: string
  state: string
  email: string
  accommodations: string
  interpretationNeeded: boolean
  handicapAccessibility: boolean
  willingToServe: boolean
  homegroup: string
}

interface PolicyAgreements {
  readPolicy: boolean
  understandQuestions: boolean
  acknowledgeBehavior: boolean
  understandAdmission: boolean
  understandReporting: boolean
  understandInvestigation: boolean
  signatureAgreement: boolean
}

interface TestregCheckoutProps {
  registrationData: RegistrationData
  policyAgreements: PolicyAgreements
  breakfastSelections: BreakfastSelections
  onBack: () => void
}

export default function TestregCheckout({
  registrationData,
  policyAgreements,
  breakfastSelections,
  onBack,
}: TestregCheckoutProps) {
  const [stripePromise, setStripePromise] = useState<ReturnType<
    typeof loadStripe
  > | null>(null)
  const [error, setError] = useState<string | null>(null)

  const product = REGISTRATION_PRODUCTS.find(
    (p) => p.id === "necypaa-xxxvi-registration"
  )
  const registrationFee = product ? product.priceInCents / 100 : 0

  // Calculate breakfast totals
  const selectedBreakfasts = BREAKFAST_PRODUCTS.filter(
    (bp) => breakfastSelections[bp.id]
  )
  const breakfastTotal = selectedBreakfasts.reduce(
    (sum, bp) => sum + bp.priceInCents,
    0
  )
  const breakfastTotalDollars = breakfastTotal / 100

  // Calculate total before fees
  const subtotalCents = (product?.priceInCents || 0) + breakfastTotal
  const processingFeeCents = calculateProcessingFee(subtotalCents)
  const processingFee = processingFeeCents / 100
  const totalAmount = subtotalCents / 100 + processingFee

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (key) {
      setStripePromise(loadStripe(key))
    } else {
      setError("Stripe publishable key not found")
    }
  }, [])

  const fetchClientSecret = useCallback(async () => {
    try {
      const selectedBreakfastIds = Object.entries(breakfastSelections)
        .filter(([, selected]) => selected)
        .map(([id]) => id)

      const clientSecret = await startTestregCheckout(
        "necypaa-xxxvi-registration",
        registrationData,
        policyAgreements,
        selectedBreakfastIds
      )
      return clientSecret
    } catch (err) {
      console.error("Error fetching client secret:", err)
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create checkout session"
      )
      throw err
    }
  }, [registrationData, policyAgreements, breakfastSelections])

  if (error) {
    return (
      <div className="space-y-6">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="border-slate-700 text-white hover:bg-slate-800 bg-transparent"
        >
          Back
        </Button>
        <div className="bg-white rounded-lg p-4 min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-2">
            <p className="text-red-600 font-semibold">Payment Error</p>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!stripePromise) {
    return (
      <div className="space-y-6">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="border-slate-700 text-white hover:bg-slate-800 bg-transparent"
        >
          Back
        </Button>
        <div className="bg-white rounded-lg p-4 min-h-[400px] flex items-center justify-center">
          <p className="text-gray-600">Loading payment form...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button
        type="button"
        onClick={onBack}
        variant="outline"
        className="border-slate-700 text-white hover:bg-slate-800 bg-transparent"
      >
        Back
      </Button>

      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Order Summary
        </h3>
        <div className="space-y-2 text-slate-300">
          <div className="flex justify-between">
            <span>Registration Fee</span>
            <span className="font-medium text-white">
              ${registrationFee.toFixed(2)}
            </span>
          </div>

          {selectedBreakfasts.length > 0 && (
            <>
              <div className="border-t border-slate-700 my-2" />
              {selectedBreakfasts.map((bp) => (
                <div key={bp.id} className="flex justify-between text-sm">
                  <span>{bp.name}</span>
                  <span className="font-medium text-white">
                    ${(bp.priceInCents / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </>
          )}

          <div className="border-t border-slate-700 my-2" />
          <div className="flex justify-between text-sm">
            <span>Processing Fee (2.9% + $0.30)</span>
            <span className="font-medium text-white">
              ${processingFee.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between text-lg font-bold">
            <span className="text-white">Total</span>
            <span className="text-orange-400">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div
        id="checkout"
        className="bg-white rounded-lg p-4 min-h-[400px]"
      >
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  )
}
