"use client"

import { useState } from "react"
import RegistrationForm from "@/components/registration-form"
import PolicyAgreement from "@/components/policy-agreement"
import RegistrationCheckout from "@/components/registration-checkout"

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

  const handleInfoComplete = (data: RegistrationData) => {
    setRegistrationData(data)
    setCurrentStep("policy")
  }

  const handlePolicyComplete = () => {
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

            {currentStep === "payment" && <RegistrationCheckout onBack={() => setCurrentStep("policy")} />}
          </div>
        </div>
      </div>
    </div>
  )
}
