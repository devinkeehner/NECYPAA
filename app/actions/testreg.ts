"use server"

import { stripe } from "@/lib/stripe"
import {
  REGISTRATION_PRODUCTS,
  BREAKFAST_PRODUCTS,
  calculateProcessingFee,
} from "@/lib/registration-products"

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

export async function startTestregCheckout(
  productId: string,
  registrationData: RegistrationData,
  policyAgreements: PolicyAgreements,
  breakfastIds: string[]
) {
  const product = REGISTRATION_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Registration product with id "${productId}" not found`)
  }

  // Build line items starting with registration
  const lineItems: Array<{
    price_data: {
      currency: string
      product_data: { name: string; description: string }
      unit_amount: number
    }
    quantity: number
  }> = [
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
  ]

  // Add selected breakfast tickets
  let totalCents = product.priceInCents
  const selectedBreakfastNames: string[] = []

  for (const bId of breakfastIds) {
    const breakfast = BREAKFAST_PRODUCTS.find((bp) => bp.id === bId)
    if (breakfast) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: breakfast.name,
            description: breakfast.description,
          },
          unit_amount: breakfast.priceInCents,
        },
        quantity: 1,
      })
      totalCents += breakfast.priceInCents
      selectedBreakfastNames.push(breakfast.name)
    }
  }

  // Calculate processing fee on the full total
  const processingFee = calculateProcessingFee(totalCents)

  lineItems.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Processing Fee",
        description: "Credit card processing fee (2.9% + $0.30)",
      },
      unit_amount: processingFee,
    },
    quantity: 1,
  })

  const metadata = {
    attendee_name: registrationData.name,
    attendee_state: registrationData.state,
    attendee_email: registrationData.email,
    accommodations: registrationData.accommodations || "None",
    interpretation_needed: registrationData.interpretationNeeded.toString(),
    handicap_accessibility:
      registrationData.handicapAccessibility.toString(),
    willing_to_serve: registrationData.willingToServe.toString(),
    homegroup_committee: registrationData.homegroup,
    policy_read_and_understood: policyAgreements.readPolicy.toString(),
    policy_questions_understood:
      policyAgreements.understandQuestions.toString(),
    policy_behavior_acknowledged:
      policyAgreements.acknowledgeBehavior.toString(),
    policy_admission_understood:
      policyAgreements.understandAdmission.toString(),
    policy_reporting_understood:
      policyAgreements.understandReporting.toString(),
    policy_investigation_understood:
      policyAgreements.understandInvestigation.toString(),
    policy_signature_agreement:
      policyAgreements.signatureAgreement.toString(),
    breakfast_tickets: selectedBreakfastNames.join(", ") || "None",
  }

  const hotelBookingUrl =
    "https://www.marriott.com/event-reservations/reservation-link.mi?id=1770049957031&key=GRP&app=resvlink"

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      return_url: hotelBookingUrl,
      customer_email: registrationData.email,
      line_items: lineItems,
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
