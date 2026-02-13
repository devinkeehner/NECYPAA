"use client"

import { useCallback, useEffect, useState } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startTestregCheckout } from "@/app/actions/testreg"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  REGISTRATION_PRODUCTS,
  BREAKFAST_PRODUCTS,
  calculateProcessingFee,
} from "@/lib/registration-products"

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
  onBack: () => void
}

export default function TestregCheckout({
  registrationData,
  policyAgreements,
  onBack,
}: TestregCheckoutProps) {
  const [stripePromise, setStripePromise] = useState<ReturnType<
    typeof loadStripe
  > | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [breakfastSelections, setBreakfastSelections] = useState<
    Record<string, boolean>
  >({})
  const [checkoutReady, setCheckoutReady] = useState(false)
  const [checkoutKey, setCheckoutKey] = useState(0)

  const product = REGISTRATION_PRODUCTS.find(
    (p) => p.id === "necypaa-xxxvi-registration"
  )
  const registrationFee = product ? product.priceInCents / 100 : 0

  const selectedBreakfasts = BREAKFAST_PRODUCTS.filter(
    (bp) => breakfastSelections[bp.id]
  )
  const breakfastTotalCents = selectedBreakfasts.reduce(
    (sum, bp) => sum + bp.priceInCents,
    0
  )
  const subtotalCents = (product?.priceInCents || 0) + breakfastTotalCents
  const processingFeeCents = calculateProcessingFee(subtotalCents)
  const processingFee = processingFeeCents / 100
  const totalAmount = subtotalCents / 100 + processingFee

  const handleToggleBreakfast = (productId: string, checked: boolean) => {
    setBreakfastSelections((prev) => ({ ...prev, [productId]: checked }))
    // Reset the Stripe checkout so it re-creates with the new total
    setCheckoutReady(false)
  }

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (key) {
      setStripePromise(loadStripe(key))
    } else {
      setError("Stripe publishable key not found")
    }
  }, [])

  const handleProceedToPayment = () => {
    setCheckoutKey((prev) => prev + 1)
    setCheckoutReady(true)
  }

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

  const fridayProduct = BREAKFAST_PRODUCTS.find(
    (p) => p.id === "breakfast-friday"
  )

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

      {/* Breakfast Add-ons Section */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-1">
          Add Breakfast Tickets
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          $20.00 each - Optional breakfast at the convention.
        </p>

        <div className="space-y-3">
          {/* Friday - New Year's Day highlighted */}
          {fridayProduct && (
            <button
              type="button"
              onClick={() =>
                handleToggleBreakfast(
                  fridayProduct.id,
                  !breakfastSelections[fridayProduct.id]
                )
              }
              className={`w-full text-left rounded-lg p-4 transition-colors border ${
                breakfastSelections[fridayProduct.id]
                  ? "bg-amber-600/20 border-amber-500"
                  : "bg-amber-900/20 border-amber-700/40 hover:border-amber-600/60"
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={fridayProduct.id}
                  checked={breakfastSelections[fridayProduct.id] || false}
                  onCheckedChange={(checked) =>
                    handleToggleBreakfast(
                      fridayProduct.id,
                      checked as boolean
                    )
                  }
                  className="mt-1 border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-white font-semibold cursor-pointer">
                      {fridayProduct.name}
                    </Label>
                    <span className="text-white font-medium text-sm">
                      $20.00
                    </span>
                  </div>
                  <p className="text-amber-400 text-sm mt-1">
                    New Year's Day -- most local restaurants will be closed!
                    Start your new year right with breakfast and fellowship.
                  </p>
                </div>
              </div>
            </button>
          )}

          {/* Saturday and Sunday */}
          {BREAKFAST_PRODUCTS.filter((p) => p.id !== "breakfast-friday").map(
            (bp) => (
              <button
                key={bp.id}
                type="button"
                onClick={() =>
                  handleToggleBreakfast(bp.id, !breakfastSelections[bp.id])
                }
                className={`w-full text-left rounded-lg p-4 transition-colors border ${
                  breakfastSelections[bp.id]
                    ? "bg-slate-700/60 border-amber-500"
                    : "bg-slate-800/60 border-slate-600 hover:border-slate-500"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={bp.id}
                    checked={breakfastSelections[bp.id] || false}
                    onCheckedChange={(checked) =>
                      handleToggleBreakfast(bp.id, checked as boolean)
                    }
                    className="mt-1 border-slate-500 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <Label className="text-white font-medium cursor-pointer">
                        {bp.name}
                      </Label>
                      <span className="text-white font-medium text-sm">
                        $20.00
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">
                      {bp.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          )}
        </div>
      </div>

      {/* Order Summary */}
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

          {selectedBreakfasts.map((bp) => (
            <div key={bp.id} className="flex justify-between text-sm">
              <span>{bp.name}</span>
              <span className="font-medium text-white">
                ${(bp.priceInCents / 100).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t border-slate-700 my-2" />
          <div className="flex justify-between text-sm">
            <span>Processing Fee (2.9% + $0.30)</span>
            <span className="font-medium text-white">
              ${processingFee.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between text-lg font-bold">
            <span className="text-white">Total</span>
            <span className="text-amber-400">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      {!checkoutReady ? (
        <Button
          onClick={handleProceedToPayment}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg font-semibold"
          disabled={!stripePromise}
        >
          Proceed to Payment - ${totalAmount.toFixed(2)}
        </Button>
      ) : (
        stripePromise && (
          <div
            key={checkoutKey}
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
        )
      )}
    </div>
  )
}
