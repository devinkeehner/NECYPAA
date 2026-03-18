import type { Metadata } from "next"
import PageShell from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Program — NECYPAA XXXVI",
  description: "Convention program and schedule for NECYPAA XXXVI. Hartford Marriott Downtown, Dec 31, 2026 – Jan 3, 2027.",
}

export default function ProgramPage() {
  return (
    <PageShell
      badge="Program"
      title="Convention Program"
      subtitle="Four days of speakers, workshops, meetings, and fellowship. The full schedule will be posted here as the convention approaches."
    />
  )
}
