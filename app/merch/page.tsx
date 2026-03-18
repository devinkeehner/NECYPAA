import type { Metadata } from "next"
import PageShell from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Merch — NECYPAA XXXVI",
  description: "Official NECYPAA XXXVI merchandise. All proceeds support the convention.",
}

export default function MerchPage() {
  return (
    <PageShell
      badge="Merch"
      title="Merchandise"
      subtitle="Official NECYPAA XXXVI gear is on the way. All proceeds support the convention."
    />
  )
}
