"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

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

interface RegistrationFormProps {
  onComplete: (data: RegistrationData) => void
  enableScholarship?: boolean
}

export default function RegistrationForm({ onComplete, enableScholarship = false }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    state: "",
    email: "",
    accommodations: "",
    interpretationNeeded: false,
    mobilityAccessibility: false,
    willingToServe: false,
    homegroup: "",
    isScholarship: false,
    scholarshipRecipientName: "",
    scholarshipRecipientEmail: "",
    accessCode: "",
  })
  const [showAccessCode, setShowAccessCode] = useState(false)

  const hasAccessCode = formData.accessCode.trim().length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const handleScholarshipQuickStart = () => {
    onComplete({
      name: "",
      state: "",
      email: "",
      accommodations: "",
      interpretationNeeded: false,
      mobilityAccessibility: false,
      willingToServe: false,
      homegroup: "",
      isScholarship: true,
      scholarshipRecipientName: "",
      scholarshipRecipientEmail: "",
      accessCode: "",
    })
  }

  const isFormValid = () => {
    const baseValid =
      formData.name.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.homegroup.trim() !== ""

    if (!baseValid) {
      return false
    }

    if (enableScholarship && formData.isScholarship) {
      return formData.scholarshipRecipientName.trim() !== ""
    }

    return true
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {enableScholarship && !hasAccessCode && (
          <div className="rounded-xl border p-3" style={{ background: "rgba(0,212,232,0.04)", borderColor: "var(--nec-border)" }}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-300 text-center sm:text-left">Buying registration for someone else?</p>
              <Button
                type="button"
                onClick={handleScholarshipQuickStart}
                className="w-full sm:w-auto text-white h-9 px-4" style={{ background: "rgba(42,53,82,0.8)", border: "1px solid var(--nec-border)" }}
              >
                Scholarship
              </Button>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="name" className="text-white">
            Name <span className="text-pink-400">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="text-white"
          />
        </div>

        <div>
          <Label htmlFor="state" className="text-white">
            State <span className="text-pink-400">*</span>
          </Label>
          <Input
            id="state"
            type="text"
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="text-white"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-white">
            Email <span className="text-pink-400">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="text-white"
          />
        </div>

        <div>
          <Label htmlFor="accommodations" className="text-white">
            Accommodations
          </Label>
          <Textarea
            id="accommodations"
            value={formData.accommodations}
            onChange={(e) => setFormData({ ...formData, accommodations: e.target.value })}
            className="text-white"
            placeholder="Please describe any accommodation needs"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="interpretationNeeded"
              checked={formData.interpretationNeeded}
              onCheckedChange={(checked) => setFormData({ ...formData, interpretationNeeded: checked as boolean })}
              className="border-gray-700"
            />
            <Label htmlFor="interpretationNeeded" className="text-white font-normal">
              Interpretation Needed
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="mobilityAccessibility"
              checked={formData.mobilityAccessibility}
              onCheckedChange={(checked) => setFormData({ ...formData, mobilityAccessibility: checked as boolean })}
              className="border-gray-700"
            />
            <Label htmlFor="mobilityAccessibility" className="text-white font-normal">
              Wheelchair / Mobility Access
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="willingToServe"
              checked={formData.willingToServe}
              onCheckedChange={(checked) => setFormData({ ...formData, willingToServe: checked as boolean })}
              className="border-gray-700"
            />
            <Label htmlFor="willingToServe" className="text-white font-normal">
              Willing to be of Service
            </Label>
          </div>
        </div>

        <div>
          <Label htmlFor="homegroup" className="text-white">
            Homegroup/Committee <span className="text-pink-400">*</span>
          </Label>
          <Input
            id="homegroup"
            type="text"
            required
            value={formData.homegroup}
            onChange={(e) => setFormData({ ...formData, homegroup: e.target.value })}
            className="text-white"
          />
        </div>
      </div>

      {/* Registration Access Code */}
      <div
        className="rounded-xl border p-3"
        style={{ background: "rgba(0,212,232,0.04)", borderColor: "var(--nec-border)" }}
      >
        <button
          type="button"
          onClick={() => setShowAccessCode(!showAccessCode)}
          aria-expanded={showAccessCode}
          aria-controls="access-code-section"
          className="w-full flex items-center justify-between text-sm text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg px-1 py-0.5"
        >
          <span>Have a Registration Access Code?</span>
          <span className="text-xs font-medium" style={{ color: "var(--nec-cyan)" }}>
            {showAccessCode ? "Hide" : "Show"}
          </span>
        </button>
        {showAccessCode && (
          <div id="access-code-section" className="pt-3">
            <Label htmlFor="accessCode" className="text-white text-sm">
              Registration Access Code
            </Label>
            <p id="accessCode-description" className="text-xs text-gray-400 mt-1 mb-2">
              For cash or scholarship registration only. Leave blank for standard paid registration.
            </p>
            <Input
              id="accessCode"
              type="text"
              value={formData.accessCode}
              onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
              className="text-white"
              placeholder="Enter your access code"
              autoComplete="off"
              aria-describedby="accessCode-description"
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isFormValid()}
        className="w-full text-white font-bold"
        style={{ background: "var(--nec-pink)", boxShadow: "0 2px 12px rgba(232,0,110,0.25)" }}
      >
        Continue to Policy Agreement
      </Button>
    </form>
  )
}
