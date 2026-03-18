import type { Metadata } from "next"
import PageShell from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Prayer — NECYPAA XXXVI",
  description: "Prayer and spiritual resources for NECYPAA XXXVI attendees.",
}

export default function PrayerPage() {
  return (
    <PageShell
      badge="Prayer"
      title="Prayer"
      subtitle="Spiritual resources and reflections. Content from the Prayer Chair coming soon."
    />
  )
}
