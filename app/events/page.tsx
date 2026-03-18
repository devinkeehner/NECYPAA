import type { Metadata } from "next"
import PageShell from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Events — NECYPAA XXXVI",
  description: "Fundraisers, pre-convention events, and activities hosted by the NECYPAA XXXVI CT Host Committee.",
}

export default function EventsPage() {
  return (
    <PageShell
      badge="Events"
      title="Events"
      subtitle="Fundraisers, pre-convention gatherings, and more. Follow along as we build the road to Hartford."
    />
  )
}
