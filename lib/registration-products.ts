export interface RegistrationProduct {
  id: string
  name: string
  description: string
  priceInCents: number
}

// Registration pricing for NECYPAA XXXVI
export const REGISTRATION_PRODUCTS: RegistrationProduct[] = [
  {
    id: "necypaa-xxxvi-registration",
    name: "NECYPAA XXXVI Registration",
    description: "The Archway of Freedom - Full conference registration (TEST PRICE)",
    priceInCents: 50, // $0.50 - minimum allowed by Stripe
  },
]

export function calculateProcessingFee(amountInCents: number): number {
  // Stripe charges 2.9% + $0.30 per transaction
  const percentageFee = Math.round(amountInCents * 0.029)
  const fixedFee = 30 // $0.30 in cents
  return percentageFee + fixedFee
}
