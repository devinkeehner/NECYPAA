"use server"

import { stripe } from "@/lib/stripe"

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

export async function submitFreeRegistration(
  registrationData: RegistrationData,
  policyAgreements: PolicyAgreements,
) {
  const metadata: Record<string, string> = {
    registration_type: "free",
    attendee_name: registrationData.name,
    attendee_state: registrationData.state,
    attendee_email: registrationData.email,
    accommodations: registrationData.accommodations || "None",
    interpretation_needed: registrationData.interpretationNeeded.toString(),
    handicap_accessibility: registrationData.handicapAccessibility.toString(),
    willing_to_serve: registrationData.willingToServe.toString(),
    homegroup_committee: registrationData.homegroup,
    policy_read_and_understood: policyAgreements.readPolicy.toString(),
    policy_questions_understood: policyAgreements.understandQuestions.toString(),
    policy_behavior_acknowledged: policyAgreements.acknowledgeBehavior.toString(),
    policy_admission_understood: policyAgreements.understandAdmission.toString(),
    policy_reporting_understood: policyAgreements.understandReporting.toString(),
    policy_investigation_understood: policyAgreements.understandInvestigation.toString(),
    policy_signature_agreement: policyAgreements.signatureAgreement.toString(),
  }

  try {
    // Search for existing customer by email
    const existingCustomers = await stripe.customers.list({
      email: registrationData.email,
      limit: 1,
    })

    let customer

    if (existingCustomers.data.length > 0) {
      // Update existing customer with latest info
      customer = await stripe.customers.update(existingCustomers.data[0].id, {
        name: registrationData.name,
        metadata,
      })
    } else {
      // Create new Stripe customer with all registration data as metadata
      customer = await stripe.customers.create({
        name: registrationData.name,
        email: registrationData.email,
        metadata,
      })
    }

    return { success: true, customerId: customer.id }
  } catch (error) {
    console.error("Failed to save registration:", error)
    throw new Error("Failed to save registration. Please try again.")
  }
}
