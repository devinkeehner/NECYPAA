"use server"

import { stripe } from "@/lib/stripe"
import { REGISTRATION_PRODUCTS } from "@/lib/registration-products"

export async function startRegistrationCheckout(productId: string) {
  console.log("[v0] Starting checkout for product:", productId)

  const product = REGISTRATION_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Registration product with id "${productId}" not found`)
  }

  console.log("[v0] Creating Stripe session for:", product.name, product.priceInCents)

  try {
    // This allows Stripe to automatically show Venmo, Apple Pay, and other compatible methods
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      redirect_on_completion: "never",
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
      ],
      mode: "payment",
    })

    console.log("[v0] Stripe session created:", session.id)

    if (!session.client_secret) {
      throw new Error("No client secret returned from Stripe")
    }

    return session.client_secret
  } catch (error) {
    console.error("[v0] Stripe session creation failed:", error)
    throw error
  }
}
