"use server"

import { stripe } from "@/lib/stripe"
import { REGISTRATION_PRODUCTS } from "@/lib/registration-products"

export async function startRegistrationCheckout(productId: string) {
  const product = REGISTRATION_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Registration product with id "${productId}" not found`)
  }

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

  return session.client_secret
}
