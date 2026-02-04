"use client"

import { useState } from "react"
import RegistrationForm from "@/components/registration-form"
import PolicyAgreement from "@/components/policy-agreement"
import RegistrationCheckout from "@/components/registration-checkout"
import type { PolicyAgreements } from "@/components/policy-agreement"

type Step = "info" | "policy" | "payment"

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

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<Step>("info")
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null)
  const [policyAgreements, setPolicyAgreements] = useState<PolicyAgreements | null>(null)

  const handleInfoComplete = (data: RegistrationData) => {
    setRegistrationData(data)
    setCurrentStep("policy")
  }

  const handlePolicyComplete = (agreements: PolicyAgreements) => {
    setPolicyAgreements(agreements)
    setCurrentStep("payment")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">NECYPAA XXXVI Registration</h1>
            <p className="text-xl text-amber-500">The Archway of Freedom</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === "info" ? "bg-amber-600 text-white" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  1
                </div>
                <span className={currentStep === "info" ? "text-white" : "text-slate-400"}>Information</span>
              </div>

              <div className="w-12 h-0.5 bg-slate-700" />

              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === "policy" ? "bg-amber-600 text-white" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  2
                </div>
                <span className={currentStep === "policy" ? "text-white" : "text-slate-400"}>Policy</span>
              </div>

              <div className="w-12 h-0.5 bg-slate-700" />

              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === "payment" ? "bg-amber-600 text-white" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  3
                </div>
                <span className={currentStep === "payment" ? "text-white" : "text-slate-400"}>Payment</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
            {currentStep === "info" && <RegistrationForm onComplete={handleInfoComplete} />}

            {currentStep === "policy" && (
              <PolicyAgreement onComplete={handlePolicyComplete} onBack={() => setCurrentStep("info")} />
            )}

            {currentStep === "payment" && registrationData && policyAgreements && (
              <RegistrationCheckout
                registrationData={registrationData}
                policyAgreements={policyAgreements}
                onBack={() => setCurrentStep("policy")}
              />
            )}
          </div>

          {/* Hotel Booking CTA */}
          <div className="mt-8 bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-lg p-6 border border-blue-700/50 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Need a Place to Stay?</h3>
            <p className="text-gray-300 mb-4">Book your room at our host hotel with the special NECYPAA rate!</p>
            <a
              href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1770049957031&key=GRP&app=resvlink"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Book Hotel
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
