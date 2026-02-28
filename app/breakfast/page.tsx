"use client"

import BreakfastCheckout from "@/components/breakfast-checkout"

export default function BreakfastPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Breakfast Ticket Checkout</h1>
            <p className="text-xl text-amber-500">NECYPAA XXXVI</p>
          </div>

          <BreakfastCheckout />
        </div>
      </div>
    </div>
  )
}
