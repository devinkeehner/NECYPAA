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
    description: "The Archway of Freedom - Full conference registration",
    priceInCents: 4000, // $40.00
  },
]

// Breakfast ticket products
export const BREAKFAST_PRODUCTS: RegistrationProduct[] = [
  {
    id: "breakfast-friday",
    name: "New Year's Day Breakfast - Friday",
    description: "New Year's Day Breakfast at the convention - Start your new year with fellowship! Most local restaurants will be closed.",
    priceInCents: 2000, // $20.00
  },
  {
    id: "breakfast-saturday",
    name: "Breakfast - Saturday",
    description: "Saturday morning breakfast at the convention",
    priceInCents: 2000, // $20.00
  },
  {
    id: "breakfast-sunday",
    name: "Breakfast - Sunday",
    description: "Sunday morning breakfast at the convention",
    priceInCents: 2000, // $20.00
  },
]

export function calculateProcessingFee(amountInCents: number): number {
  // Stripe charges 2.9% + $0.30 per transaction
  const percentageFee = Math.round(amountInCents * 0.029)
  const fixedFee = 30 // $0.30 in cents
  return percentageFee + fixedFee
}
