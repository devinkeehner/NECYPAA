"use server"

import { stripe } from "@/lib/stripe"
import { REGISTRATION_PRODUCTS, calculateProcessingFee } from "@/lib/registration-products"

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

export async function startRegistrationCheckout(
  productId: string,
  registrationData: RegistrationData,
  policyAgreements: PolicyAgreements,
) {
  const product = REGISTRATION_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Registration product with id "${productId}" not found`)
  }

  const processingFee = calculateProcessingFee(product.priceInCents)

  const metadata = {
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
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      redirect_on_completion: "never",
      customer_email: registrationData.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.priceInCents,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Processing Fee",
              description: "Credit card processing fee (2.9% + $0.30)",
            },
            unit_amount: processingFee,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: metadata,
      payment_intent_data: {
        metadata: metadata,
      },
    })

    if (!session.client_secret) {
      throw new Error("No client secret returned from Stripe")
    }

    return session.client_secret
  } catch (error) {
    console.error("Stripe session creation failed:", error)
    throw error
  }
}
