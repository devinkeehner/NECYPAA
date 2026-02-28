"use client"

import { useCallback, useEffect, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startRegistrationCheckout } from "@/app/actions/registration"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { BREAKFAST_PRODUCTS, REGISTRATION_PRODUCTS, calculateProcessingFee } from "@/lib/registration-products"

interface RegistrationData {
  name: string
  state: string
  email: string
  accommodations: string
  interpretationNeeded: boolean
  handicapAccessibility: boolean
  willingToServe: boolean
  homegroup: string
  isScholarship: boolean
  scholarshipRecipientName: string
  scholarshipRecipientEmail: string
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
  policyAgreements: PolicyAgreements | null
  onBack: () => void
}

export default function RegistrationCheckout({ registrationData, policyAgreements, onBack }: RegistrationCheckoutProps) {
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isScholarshipMode, setIsScholarshipMode] = useState(registrationData.isScholarship)
  const [scholarshipQuantity, setScholarshipQuantity] = useState(1)
  const [aaEntity, setAaEntity] = useState("")
  const [reservedForPeople, setReservedForPeople] = useState<string[]>([""])
  const [breakfastSelections, setBreakfastSelections] = useState<Record<string, boolean>>({})
  const [checkoutReady, setCheckoutReady] = useState(false)
  const [checkoutKey, setCheckoutKey] = useState(0)

  const product = REGISTRATION_PRODUCTS.find((p) => p.id === "necypaa-xxxvi-registration")
  const unitRegistrationFeeCents = product?.priceInCents || 0
  const unitRegistrationFee = unitRegistrationFeeCents / 100

  const selfRegistrationQuantity = registrationData.isScholarship ? 0 : 1
  const effectiveScholarshipQuantity = isScholarshipMode ? scholarshipQuantity : 0

  const selectedBreakfasts = BREAKFAST_PRODUCTS.filter((bp) => breakfastSelections[bp.id])
  const breakfastTotalCents = selectedBreakfasts.reduce((sum, bp) => sum + bp.priceInCents, 0)

  const registrationSubtotalCents = unitRegistrationFeeCents * (selfRegistrationQuantity + effectiveScholarshipQuantity)
  const subtotalCents = registrationSubtotalCents + breakfastTotalCents
  const processingFee = calculateProcessingFee(subtotalCents) / 100
  const totalAmount = subtotalCents / 100 + processingFee

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (key) {
      setStripePromise(loadStripe(key))
    } else {
      setError("Stripe publishable key not found")
    }
  }, [])

  useEffect(() => {
    if (!isScholarshipMode) {
      return
    }

    setReservedForPeople((prev) => {
      if (prev.length <= effectiveScholarshipQuantity) {
        return prev
      }
      return prev.slice(0, effectiveScholarshipQuantity)
    })
  }, [isScholarshipMode, effectiveScholarshipQuantity])

  const fetchClientSecret = useCallback(async () => {
    try {
      const reservedNames = reservedForPeople.map((name) => name.trim()).filter(Boolean)
      const selectedBreakfastIds = selectedBreakfasts.map((bp) => bp.id)

      return await startRegistrationCheckout(
        "necypaa-xxxvi-registration",
        registrationData,
        policyAgreements,
        effectiveScholarshipQuantity,
        selectedBreakfastIds,
        {
          aaEntity: aaEntity.trim() || undefined,
          reservedForPerson: reservedNames.length > 0 ? reservedNames.join(", ") : undefined,
        },
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create checkout session")
      throw err
    }
  }, [
    aaEntity,
    effectiveScholarshipQuantity,
    policyAgreements,
    registrationData,
    reservedForPeople,
    selectedBreakfasts,
  ])

  const toggleBreakfast = (productId: string, checked: boolean) => {
    setBreakfastSelections((prev) => ({ ...prev, [productId]: checked }))
    setCheckoutReady(false)
  }

  const updateReservedPerson = (index: number, value: string) => {
    setReservedForPeople((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
    setCheckoutReady(false)
  }

  const addReservedPersonField = () => {
    setReservedForPeople((prev) => {
      if (prev.length >= effectiveScholarshipQuantity) {
        return prev
      }
      return [...prev, ""]
    })
    setCheckoutReady(false)
  }

  const removeReservedPersonField = () => {
    setReservedForPeople((prev) => {
      if (prev.length <= 1) {
        return prev
      }
      return prev.slice(0, -1)
    })
    setCheckoutReady(false)
  }

  const enableScholarship = () => {
    setIsScholarshipMode(true)
    setCheckoutReady(false)
  }

  const disableScholarship = () => {
    setIsScholarshipMode(false)
    setCheckoutReady(false)
  }

  const decreaseScholarship = () => {
    setScholarshipQuantity((q) => Math.max(1, q - 1))
    setCheckoutReady(false)
  }

  const increaseScholarship = () => {
    setScholarshipQuantity((q) => Math.min(20, q + 1))
    setCheckoutReady(false)
  }

  const proceedToPayment = () => {
    setCheckoutKey((prev) => prev + 1)
    setCheckoutReady(true)
  }

  const fridayProduct = BREAKFAST_PRODUCTS.find((p) => p.id === "breakfast-friday")
  const weekendProducts = BREAKFAST_PRODUCTS.filter((p) => p.id !== "breakfast-friday")

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
      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="border-slate-700 text-white hover:bg-slate-800 bg-transparent"
        >
          Back
        </Button>
        {!isScholarshipMode && selfRegistrationQuantity > 0 && (
          <Button type="button" onClick={enableScholarship} className="bg-orange-600 hover:bg-orange-700 text-white">
            Add Scholarship
          </Button>
        )}
      </div>

      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
        <h3 className="text-lg font-semibold text-white">Registration Summary</h3>
        <div className="space-y-2 text-slate-300">
          {selfRegistrationQuantity > 0 && (
            <div className="flex justify-between">
              <span>Registration Fee</span>
              <span className="font-medium text-white">${unitRegistrationFee.toFixed(2)}</span>
            </div>
          )}

          {isScholarshipMode && (
            <div className="space-y-2 rounded-md border border-slate-700 p-3">
              <div className="flex justify-between items-center">
                <span>Scholarship Fee ({effectiveScholarshipQuantity} x ${unitRegistrationFee.toFixed(2)})</span>
                <span className="font-medium text-white">
                  ${(effectiveScholarshipQuantity * unitRegistrationFee).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={decreaseScholarship}
                  className="px-3 py-1 text-white bg-slate-700 hover:bg-slate-600 rounded disabled:opacity-50"
                  disabled={scholarshipQuantity <= 1}
                >
                  -
                </button>
                <span className="px-2 py-1 text-white font-semibold">{scholarshipQuantity}</span>
                <button
                  type="button"
                  onClick={increaseScholarship}
                  className="px-3 py-1 text-white bg-slate-700 hover:bg-slate-600 rounded disabled:opacity-50"
                  disabled={scholarshipQuantity >= 20}
                >
                  +
                </button>
                {selfRegistrationQuantity > 0 && (
                  <button
                    type="button"
                    onClick={disableScholarship}
                    className="ml-2 px-3 py-1 text-white bg-red-700 hover:bg-red-600 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          )}

          {selectedBreakfasts.map((bp) => (
            <div key={bp.id} className="flex justify-between">
              <span>
                Breakfast -{" "}
                {bp.id === "breakfast-friday" ? "Friday" : bp.id === "breakfast-saturday" ? "Saturday" : "Sunday"}
              </span>
              <span className="font-medium text-white">${(bp.priceInCents / 100).toFixed(2)}</span>
            </div>
          ))}

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

      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
        <h3 className="text-lg font-semibold text-white">New Years Day Breakfast!</h3>
        <p className="text-sm text-slate-400">
          Keep your mornings simple at the convention hotel. Friday is especially useful since many local restaurants
          are closed on New Year&apos;s Day.
        </p>

        {fridayProduct && (
          <button
            type="button"
            onClick={() => toggleBreakfast(fridayProduct.id, !breakfastSelections[fridayProduct.id])}
            className={`w-full text-left rounded-md px-4 py-3 transition-colors border ${
              breakfastSelections[fridayProduct.id]
                ? "bg-amber-600/20 border-amber-500"
                : "bg-amber-900/10 border-amber-700/30 hover:border-amber-600/60"
            }`}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id={fridayProduct.id}
                checked={breakfastSelections[fridayProduct.id] || false}
                onCheckedChange={(checked) => toggleBreakfast(fridayProduct.id, checked as boolean)}
                className="mt-1 border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-white font-semibold cursor-pointer">Friday - New Year&apos;s Day</Label>
                  <span className="text-sm text-white font-semibold">$20</span>
                </div>
                <p className="text-amber-300 text-xs mt-1">
                  Strongly recommended: most local restaurants are closed.
                </p>
              </div>
            </div>
          </button>
        )}

        <div className="grid gap-2 sm:grid-cols-2">
          {weekendProducts.map((bp) => (
            <button
              key={bp.id}
              type="button"
              onClick={() => toggleBreakfast(bp.id, !breakfastSelections[bp.id])}
              className={`w-full text-left rounded-md px-3 py-2.5 transition-colors border ${
                breakfastSelections[bp.id]
                  ? "bg-slate-700/60 border-amber-500"
                  : "bg-slate-800/60 border-slate-600 hover:border-slate-500"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Checkbox
                  id={bp.id}
                  checked={breakfastSelections[bp.id] || false}
                  onCheckedChange={(checked) => toggleBreakfast(bp.id, checked as boolean)}
                  className="border-slate-500 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1 flex items-center justify-between">
                  <Label className="text-sm text-white cursor-pointer">
                    {bp.id === "breakfast-saturday" ? "Saturday Breakfast" : "Sunday Breakfast"}
                  </Label>
                  <span className="text-sm text-white font-medium">$20</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {isScholarshipMode && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
          <h3 className="text-lg font-semibold text-white">Optional Scholarship Attribution</h3>
          <div>
            <label htmlFor="aaEntity" className="block text-sm text-slate-300 mb-1">
              YPAA Committee, Meeting, District, Area, or State (optional)
            </label>
            <input
              id="aaEntity"
              type="text"
              value={aaEntity}
              onChange={(e) => {
                setAaEntity(e.target.value)
                setCheckoutReady(false)
              }}
              placeholder="Example: CT Bid for ICYPAA, District 5, CT Area 11, New Haven YP Meeting"
              className="w-full rounded-md border border-slate-600 bg-slate-900 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-300">Reserved for individual (optional)</label>
            {reservedForPeople.map((name, index) => (
              <input
                key={`reserved-person-${index}`}
                type="text"
                value={name}
                onChange={(e) => updateReservedPerson(index, e.target.value)}
                placeholder="John S, Middletown USA"
                className="w-full rounded-md border border-slate-600 bg-slate-900 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            ))}
            {effectiveScholarshipQuantity > 1 && (
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={addReservedPersonField}
                  disabled={reservedForPeople.length >= effectiveScholarshipQuantity}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-bold disabled:opacity-50"
                  aria-label="Add another name"
                  title="Add another name"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={removeReservedPersonField}
                  disabled={reservedForPeople.length <= 1}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-slate-700 hover:bg-slate-600 text-white font-bold disabled:opacity-50"
                  aria-label="Remove last name"
                  title="Remove last name"
                >
                  -
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!checkoutReady ? (
        <Button
          onClick={proceedToPayment}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg font-semibold"
        >
          Proceed to Payment - ${totalAmount.toFixed(2)}
        </Button>
      ) : (
        <div key={checkoutKey} id="checkout" className="bg-white rounded-lg p-4 min-h-[400px]">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )}
    </div>
  )
}
