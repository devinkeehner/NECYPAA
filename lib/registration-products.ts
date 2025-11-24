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
    priceInCents: 3000,
  },
]
