import type { Metadata } from "next"
import PageShell from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Get Involved — NECYPAA XXXVI",
  description: "Volunteer, serve on a committee, or find your place in NECYPAA. Service opportunities for the XXXVI convention.",
}

export default function GetInvolvedPage() {
  return (
    <PageShell
      badge="Service"
      title="Get Involved"
      subtitle="There's a place for everyone. Find out how to serve, volunteer, and be part of what makes NECYPAA happen."
    />
  )
}
