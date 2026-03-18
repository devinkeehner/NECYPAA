import type { Metadata } from "next"
import PageShell from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Member States — NECYPAA XXXVI",
  description: "AA resources, intergroups, and young people's groups across the 12 NECYPAA member states and Washington, D.C.",
}

export default function StatesPage() {
  return (
    <PageShell
      badge="States"
      title="Member States"
      subtitle="Local AA resources, intergroups, and young people's groups across the NECYPAA region — 12 states and D.C."
    />
  )
}
