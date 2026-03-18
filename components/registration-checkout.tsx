"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startRegistrationCheckout, submitAccessCodeRegistration } from "@/app/actions/registration"
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
  mobilityAccessibility: boolean
  willingToServe: boolean
  homegroup: string
  isScholarship: boolean
  scholarshipRecipientName: string
  scholarshipRecipientEmail: string
  accessCode: string
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
  const router = useRouter()
  const hasAccessCode = (registrationData.accessCode ?? "").trim().length > 0

  // ── All hooks must be declared unconditionally (Rules of Hooks) ──

  // Access code flow state
  const [accessCodeError, setAccessCodeError] = useState<string | null>(null)
  const [isSubmittingCode, setIsSubmittingCode] = useState(false)
  const [accessCodeSuccess, setAccessCodeSuccess] = useState(false)

  // Standard paid checkout state
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

  const canAddBreakfast = selfRegistrationQuantity > 0
  const selectedBreakfasts = canAddBreakfast
    ? BREAKFAST_PRODUCTS.filter((bp) => breakfastSelections[bp.id])
    : []
  const breakfastTotalCents = selectedBreakfasts.reduce((sum, bp) => sum + bp.priceInCents, 0)

  const registrationSubtotalCents = unitRegistrationFeeCents * (selfRegistrationQuantity + effectiveScholarshipQuantity)
  const subtotalCents = registrationSubtotalCents + breakfastTotalCents
  const processingFee = calculateProcessingFee(subtotalCents) / 100
  const totalAmount = subtotalCents / 100 + processingFee

  useEffect(() => {
    if (hasAccessCode) return
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (key) {
      setStripePromise(loadStripe(key))
    } else {
      setError("We're having trouble loading the payment form. Please refresh the page or try again in a moment.")
    }
  }, [hasAccessCode])

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
      const selectedBreakfastIds = canAddBreakfast ? selectedBreakfasts.map((bp) => bp.id) : []

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
      setError(err instanceof Error ? err.message : "Something didn't go as planned. Please try again — and if it keeps happening, reach out to us at info@necypaa.org.")
      throw err
    }
  }, [
    aaEntity,
    canAddBreakfast,
    effectiveScholarshipQuantity,
    policyAgreements,
    registrationData,
    reservedForPeople,
    selectedBreakfasts,
  ])

  // ── Access code handlers ──────────────────────────────────────

  const handleAccessCodeSubmit = async () => {
    if (!policyAgreements) {
      setAccessCodeError("Policy agreements are required. Please go back and complete the policy step.")
      return
    }

    setIsSubmittingCode(true)
    setAccessCodeError(null)

    try {
      const result = await submitAccessCodeRegistration(registrationData, policyAgreements)

      if (!result.success) {
        setAccessCodeError(result.error)
        return
      }

      setAccessCodeSuccess(true)
      router.push("/register/success")
    } catch {
      setAccessCodeError("Something went wrong. Please try again — and if it keeps happening, reach out to us at info@necypaa.org.")
    } finally {
      setIsSubmittingCode(false)
    }
  }

  // ── Paid checkout handlers ────────────────────────────────────

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

  // ── Access code checkout path ─────────────────────────────────

  if (hasAccessCode) {
    return (
      <div className="space-y-6">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="text-white bg-transparent" style={{ borderColor: "var(--nec-border)" }}
        >
          Back
        </Button>

        <div className="rounded-2xl p-6 border space-y-4" style={{ background: "rgba(26,34,54,0.6)", borderColor: "var(--nec-border)" }}>
          <h3 className="text-lg font-semibold text-white">Registration Summary</h3>
          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between">
              <span>Registration (Access Code)</span>
              <span className="font-medium text-white">$0.00</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold" style={{ borderColor: "var(--nec-border)" }}>
              <span className="text-white">Total</span>
              <span style={{ color: "var(--nec-gold)" }}>$0.00</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Your registration will be completed using your access code. No payment is required.
          </p>
        </div>

        <div aria-live="polite">
          {accessCodeError && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 text-sm rounded-lg p-3 text-center" role="alert">
              {accessCodeError}
            </div>
          )}
        </div>

        {accessCodeSuccess ? (
          <div className="text-center py-4">
            <p className="text-white font-semibold">Registration complete! Redirecting&hellip;</p>
          </div>
        ) : (
          <Button
            onClick={handleAccessCodeSubmit}
            disabled={isSubmittingCode}
            className="w-full text-white py-6 text-lg font-bold"
            style={{ background: "var(--nec-pink)", boxShadow: "0 2px 16px rgba(232,0,110,0.3)" }}
          >
            {isSubmittingCode ? "Completing Registration\u2026" : "Complete Registration"}
          </Button>
        )}
      </div>
    )
  }

  // ── Standard paid checkout path ───────────────────────────────

  if (error) {
    return (
      <div className="space-y-6">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="text-white bg-transparent" style={{ borderColor: "var(--nec-border)" }}
        >
          Back
        </Button>
        <div className="rounded-2xl p-4 min-h-[400px] flex items-center justify-center" style={{ background: "rgba(26,34,54,0.9)", border: "1px solid var(--nec-border)" }}>
          <div className="text-center space-y-2">
            <p className="text-red-400 font-semibold">Hmm, something went wrong</p>
            <p className="text-gray-400">{error}</p>
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
          className="text-white bg-transparent" style={{ borderColor: "var(--nec-border)" }}
        >
          Back
        </Button>
        <div className="rounded-2xl p-4 min-h-[400px] flex items-center justify-center" style={{ background: "rgba(26,34,54,0.9)", border: "1px solid var(--nec-border)" }}>
          <p className="text-gray-400">Loading payment form...</p>
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
          className="text-white bg-transparent" style={{ borderColor: "var(--nec-border)" }}
        >
          Back
        </Button>
        {!isScholarshipMode && selfRegistrationQuantity > 0 && (
          <Button type="button" onClick={enableScholarship} className="text-white" style={{ background: "var(--nec-orange)" }}>
            Add Scholarship
          </Button>
        )}
      </div>

      <div className="rounded-2xl p-6 border space-y-4" style={{ background: "rgba(26,34,54,0.6)", borderColor: "var(--nec-border)" }}>
        <h3 className="text-lg font-semibold text-white">Registration Summary</h3>
        <div className="space-y-2 text-gray-300">
          {selfRegistrationQuantity > 0 && (
            <div className="flex justify-between">
              <span>Registration Fee</span>
              <span className="font-medium text-white">${unitRegistrationFee.toFixed(2)}</span>
            </div>
          )}

          {isScholarshipMode && (
            <div className="space-y-2 rounded-xl border p-3" style={{ borderColor: "var(--nec-border)" }}>
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
                  className="px-3 py-1 text-white rounded disabled:opacity-50" style={{ background: "rgba(42,53,82,0.8)" }}
                  disabled={scholarshipQuantity <= 1}
                >
                  -
                </button>
                <span className="px-2 py-1 text-white font-semibold">{scholarshipQuantity}</span>
                <button
                  type="button"
                  onClick={increaseScholarship}
                  className="px-3 py-1 text-white rounded disabled:opacity-50" style={{ background: "rgba(42,53,82,0.8)" }}
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
          <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold" style={{ borderColor: "var(--nec-border)" }}>
            <span className="text-white">Total</span>
            <span style={{ color: "var(--nec-gold)" }}>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {canAddBreakfast && (
        <div className="rounded-2xl p-6 border space-y-4" style={{ background: "rgba(26,34,54,0.6)", borderColor: "var(--nec-border)" }}>
          <h3 className="text-lg font-semibold text-white">New Years Day Breakfast!</h3>
          <p className="text-sm text-gray-400">
            Keep your mornings simple at the convention hotel. Friday is especially useful since many local restaurants
            are closed on New Year&apos;s Day.
          </p>

          {fridayProduct && (
            <button
              type="button"
              onClick={() => toggleBreakfast(fridayProduct.id, !breakfastSelections[fridayProduct.id])}
              className="w-full text-left rounded-xl px-4 py-3 transition-colors border"
              style={{
                background: breakfastSelections[fridayProduct.id] ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.04)",
                borderColor: breakfastSelections[fridayProduct.id] ? "rgba(249,115,22,0.5)" : "rgba(249,115,22,0.15)",
              }}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={fridayProduct.id}
                  checked={breakfastSelections[fridayProduct.id] || false}
                  onCheckedChange={(checked) => toggleBreakfast(fridayProduct.id, checked as boolean)}
                  className="mt-1 border-orange-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-white font-semibold cursor-pointer">Friday - New Year&apos;s Day</Label>
                    <span className="text-sm text-white font-semibold">$20</span>
                  </div>
                  <p className="text-orange-300 text-xs mt-1">
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
                className="w-full text-left rounded-xl px-3 py-2.5 transition-colors border"
                style={{
                  background: breakfastSelections[bp.id] ? "rgba(42,53,82,0.6)" : "rgba(26,34,54,0.6)",
                  borderColor: breakfastSelections[bp.id] ? "rgba(249,115,22,0.5)" : "var(--nec-border)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id={bp.id}
                    checked={breakfastSelections[bp.id] || false}
                    onCheckedChange={(checked) => toggleBreakfast(bp.id, checked as boolean)}
                    className="border-gray-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
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
      )}

      {isScholarshipMode && (
        <div className="rounded-2xl p-6 border space-y-4" style={{ background: "rgba(26,34,54,0.6)", borderColor: "var(--nec-border)" }}>
          <h3 className="text-lg font-semibold text-white">Optional Scholarship Attribution</h3>
          <div>
            <label htmlFor="aaEntity" className="block text-sm text-gray-300 mb-1">
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
              className="w-full rounded-xl border text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              style={{ borderColor: "var(--nec-border)", background: "rgba(17,24,39,0.8)" }}
            />
          </div>

          <div className="space-y-2">
            <span className="block text-sm text-gray-300" id="reserved-for-label">Reserved for individual (optional)</span>
            {reservedForPeople.map((name, index) => (
              <input
                key={`reserved-person-${index}`}
                type="text"
                value={name}
                onChange={(e) => updateReservedPerson(index, e.target.value)}
                placeholder="John S, Middletown USA"
                aria-labelledby="reserved-for-label"
                aria-label={`Reserved for person ${index + 1}`}
                className="w-full rounded-xl border text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                style={{ borderColor: "var(--nec-border)", background: "rgba(17,24,39,0.8)" }}
              />
            ))}
            {effectiveScholarshipQuantity > 1 && (
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={addReservedPersonField}
                  disabled={reservedForPeople.length >= effectiveScholarshipQuantity}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-white font-bold disabled:opacity-50" style={{ background: "var(--nec-pink)" }}
                  aria-label="Add another name"
                  title="Add another name"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={removeReservedPersonField}
                  disabled={reservedForPeople.length <= 1}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-white font-bold disabled:opacity-50" style={{ background: "rgba(42,53,82,0.8)" }}
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
          className="w-full text-white py-6 text-lg font-bold"
          style={{ background: "var(--nec-pink)", boxShadow: "0 2px 16px rgba(232,0,110,0.3)" }}
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
