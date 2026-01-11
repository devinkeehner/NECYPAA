"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RegistrationData {
  registrationType: "attendee" | "scholarship"
  scholarshipQuantity?: number
  name: string
  state: string
  email: string
  accommodations: string
  interpretationNeeded: boolean
  handicapAccessibility: boolean
  willingToServe: boolean
  homegroup: string
}

interface RegistrationFormProps {
  onComplete: (data: RegistrationData) => void
}

export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    registrationType: "attendee",
    scholarshipQuantity: 1,
    name: "",
    state: "",
    email: "",
    accommodations: "",
    interpretationNeeded: false,
    handicapAccessibility: false,
    willingToServe: false,
    homegroup: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const isFormValid = () => {
    if (formData.registrationType === "scholarship") {
      // For scholarship, only email is required
      return formData.email.trim() !== "" && (formData.scholarshipQuantity || 0) > 0
    }
    // For attendee registration, all fields are required
    return (
      formData.name.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.homegroup.trim() !== ""
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
        <Label className="text-white text-lg font-semibold">I would like to:</Label>
        <RadioGroup
          value={formData.registrationType}
          onValueChange={(value: "attendee" | "scholarship") => setFormData({ ...formData, registrationType: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="attendee" id="attendee" />
            <Label htmlFor="attendee" className="text-white font-normal cursor-pointer">
              Register to attend NECYPAA XXXVI
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="scholarship" id="scholarship" />
            <Label htmlFor="scholarship" className="text-white font-normal cursor-pointer">
              Purchase scholarship(s) to help others attend
            </Label>
          </div>
        </RadioGroup>

        {formData.registrationType === "scholarship" && (
          <div className="mt-4 pl-6">
            <Label htmlFor="scholarshipQuantity" className="text-white">
              Number of Scholarships
            </Label>
            <Input
              id="scholarshipQuantity"
              type="number"
              min="1"
              max="20"
              value={formData.scholarshipQuantity}
              onChange={(e) => setFormData({ ...formData, scholarshipQuantity: Number.parseInt(e.target.value) || 1 })}
              className="bg-slate-800 border-slate-700 text-white w-32 mt-2"
            />
            <p className="text-sm text-slate-400 mt-2">
              Each scholarship covers one full registration ($35.00 + processing fee)
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {formData.registrationType === "attendee" && (
          <>
            <div>
              <Label htmlFor="name" className="text-white">
                Name <span className="text-amber-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="state" className="text-white">
                State <span className="text-amber-500">*</span>
              </Label>
              <Input
                id="state"
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </>
        )}

        <div>
          <Label htmlFor="email" className="text-white">
            Email <span className="text-amber-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-slate-800 border-slate-700 text-white"
          />
          {formData.registrationType === "scholarship" && (
            <p className="text-sm text-slate-400 mt-1">
              We'll send a confirmation of your scholarship donation to this email
            </p>
          )}
        </div>

        {formData.registrationType === "attendee" && (
          <>
            <div>
              <Label htmlFor="accommodations" className="text-white">
                Accommodations
              </Label>
              <Textarea
                id="accommodations"
                value={formData.accommodations}
                onChange={(e) => setFormData({ ...formData, accommodations: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="Please describe any accommodation needs"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interpretationNeeded"
                  checked={formData.interpretationNeeded}
                  onCheckedChange={(checked) => setFormData({ ...formData, interpretationNeeded: checked as boolean })}
                  className="border-slate-700"
                />
                <Label htmlFor="interpretationNeeded" className="text-white font-normal">
                  Interpretation Needed
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="handicapAccessibility"
                  checked={formData.handicapAccessibility}
                  onCheckedChange={(checked) => setFormData({ ...formData, handicapAccessibility: checked as boolean })}
                  className="border-slate-700"
                />
                <Label htmlFor="handicapAccessibility" className="text-white font-normal">
                  Handicap Accessibility
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="willingToServe"
                  checked={formData.willingToServe}
                  onCheckedChange={(checked) => setFormData({ ...formData, willingToServe: checked as boolean })}
                  className="border-slate-700"
                />
                <Label htmlFor="willingToServe" className="text-white font-normal">
                  Willing to be of Service
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="homegroup" className="text-white">
                Homegroup/Committee <span className="text-amber-500">*</span>
              </Label>
              <Input
                id="homegroup"
                type="text"
                required
                value={formData.homegroup}
                onChange={(e) => setFormData({ ...formData, homegroup: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </>
        )}
      </div>

      <Button type="submit" disabled={!isFormValid()} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
        {formData.registrationType === "scholarship" ? "Continue to Payment" : "Continue to Policy Agreement"}
      </Button>
    </form>
  )
}
