"use client"

import { useCallback, useEffect, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startRegistrationCheckout } from "@/app/actions/registration"
import { Button } from "@/components/ui/button"
import { REGISTRATION_PRODUCTS, calculateProcessingFee } from "@/lib/registration-products"

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

interface RegistrationCheckoutProps {
  registrationData: RegistrationData
  policyAgreements: PolicyAgreements
  onBack: () => void
}

export default function RegistrationCheckout({
  registrationData,
  policyAgreements,
  onBack,
}: RegistrationCheckoutProps) {
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const product = REGISTRATION_PRODUCTS.find((p) => p.id === "necypaa-xxxvi-registration")
  const registrationFee = product ? product.priceInCents / 100 : 0
  const processingFee = product ? calculateProcessingFee(product.priceInCents) / 100 : 0
  const totalAmount = registrationFee + processingFee

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    console.log("[v0] Stripe Key exists:", !!key)
    console.log("[v0] Stripe Key starts with:", key?.substring(0, 7))
    if (key) {
      setStripePromise(loadStripe(key))
    } else {
      setError("Stripe publishable key not found")
    }
  }, [])

  const fetchClientSecret = useCallback(async () => {
    try {
      console.log("[v0] Fetching client secret with registration data:", registrationData)
      const clientSecret = await startRegistrationCheckout(
        "necypaa-xxxvi-registration",
        registrationData,
        policyAgreements,
      )
      console.log("[v0] Client secret received:", clientSecret ? "Yes" : "No")
      return clientSecret
    } catch (error) {
      console.error("[v0] Error fetching client secret:", error)
      setError(error instanceof Error ? error.message : "Failed to create checkout session")
      throw error
    }
  }, [registrationData, policyAgreements])

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
        <h3 className="text-lg font-semibold text-white mb-4">Registration Summary</h3>
        <div className="space-y-2 text-slate-300">
          <div className="flex justify-between">
            <span>Registration Fee</span>
            <span className="font-medium text-white">${registrationFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Processing Fee (2.9% + $0.30)</span>
            <span className="font-medium text-white">${processingFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between text-lg font-bold">
            <span className="text-white">Total</span>
            <span className="text-orange-400">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div id="checkout" className="bg-white rounded-lg p-4 min-h-[400px]">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  )
}
