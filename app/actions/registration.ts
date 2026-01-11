"use server"

import { stripe } from "@/lib/stripe"
import { REGISTRATION_PRODUCTS, calculateProcessingFee } from "@/lib/registration-products"

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
  policyAgreements: PolicyAgreements | null,
) {
  const product = REGISTRATION_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Registration product with id "${productId}" not found`)
  }

  const quantity = registrationData.registrationType === "scholarship" ? registrationData.scholarshipQuantity || 1 : 1
  const totalPrice = product.priceInCents * quantity

  console.log("[v0] Creating checkout for product:", product.name, "Quantity:", quantity, "Total Price:", totalPrice)

  const processingFee = calculateProcessingFee(totalPrice)
  console.log("[v0] Processing fee:", processingFee)

  const metadata: Record<string, string> = {
    registration_type: registrationData.registrationType,
    donor_email: registrationData.email,
  }

  if (registrationData.registrationType === "scholarship") {
    metadata.scholarship_quantity = quantity.toString()
    metadata.scholarship_total = `$${(totalPrice / 100).toFixed(2)}`
  } else {
    metadata.attendee_name = registrationData.name
    metadata.attendee_state = registrationData.state
    metadata.attendee_email = registrationData.email
    metadata.accommodations = registrationData.accommodations || "None"
    metadata.interpretation_needed = registrationData.interpretationNeeded.toString()
    metadata.handicap_accessibility = registrationData.handicapAccessibility.toString()
    metadata.willing_to_serve = registrationData.willingToServe.toString()
    metadata.homegroup_committee = registrationData.homegroup

    if (policyAgreements) {
      metadata.policy_read_and_understood = policyAgreements.readPolicy.toString()
      metadata.policy_questions_understood = policyAgreements.understandQuestions.toString()
      metadata.policy_behavior_acknowledged = policyAgreements.acknowledgeBehavior.toString()
      metadata.policy_admission_understood = policyAgreements.understandAdmission.toString()
      metadata.policy_reporting_understood = policyAgreements.understandReporting.toString()
      metadata.policy_investigation_understood = policyAgreements.understandInvestigation.toString()
      metadata.policy_signature_agreement = policyAgreements.signatureAgreement.toString()
    }
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
              name: registrationData.registrationType === "scholarship" ? "NECYPAA XXXVI Scholarship" : product.name,
              description:
                registrationData.registrationType === "scholarship"
                  ? `Scholarship donation to help ${quantity} ${quantity === 1 ? "person" : "people"} attend NECYPAA XXXVI`
                  : product.description,
            },
            unit_amount: product.priceInCents,
          },
          quantity: quantity,
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

    console.log("[v0] Stripe session created with ID:", session.id)
    console.log("[v0] Client secret exists:", !!session.client_secret)

    if (!session.client_secret) {
      throw new Error("No client secret returned from Stripe")
    }

    return session.client_secret
  } catch (error) {
    console.error("[v0] Stripe session creation failed:", error)
    throw error
  }
}
