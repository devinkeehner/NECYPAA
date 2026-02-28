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
  // Gross-up so the added fee also covers Stripe's fee on that fee line item.
  // Stripe fee model: fee = 2.9% * total_charge + $0.30
  // Solve for total_charge = amount + fee => fee = (amount + 30)/(1-0.029) - amount
  const fixedFee = 30 // $0.30 in cents
  const percentageRate = 0.029
  return Math.round((amountInCents + fixedFee) / (1 - percentageRate) - amountInCents)
}
