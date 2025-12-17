"use client"

import { useCallback, useEffect, useState } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startRegistrationCheckout } from "@/app/actions/registration"
import { Button } from "@/components/ui/button"

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

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (key) {
      setStripePromise(loadStripe(key))
    }
  }, [])

  const fetchClientSecret = useCallback(async () => {
    try {
      const clientSecret = await startRegistrationCheckout(
        "necypaa-xxxvi-registration",
        registrationData,
        policyAgreements,
      )
      return clientSecret
    } catch (error) {
      console.error("Error fetching client secret:", error)
      throw error
    }
  }, [registrationData, policyAgreements])

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

      <div id="checkout" className="bg-white rounded-lg p-4 min-h-[400px]">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  )
}
