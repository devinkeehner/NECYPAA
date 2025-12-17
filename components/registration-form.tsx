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
  handicapAccessibility: boolean
  willingToServe: boolean
  homegroup: string
}

interface RegistrationFormProps {
  onComplete: (data: RegistrationData) => void
}

export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationData>({
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
    return (
      formData.name.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.homegroup.trim() !== ""
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
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
        </div>

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
      </div>

      <Button type="submit" disabled={!isFormValid()} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
        Continue to Policy Agreement
      </Button>
    </form>
  )
}
