import type { Metadata } from "next"
import PageShell from "@/components/page-shell"

export const metadata: Metadata = {
  title: "ASL Resources — NECYPAA XXXVI",
  description: "American Sign Language resources and interpretation information for NECYPAA XXXVI.",
}

export default function ASLPage() {
  return (
    <PageShell
      badge="ASL"
      title="ASL Resources"
      subtitle="American Sign Language interpretation and signing resources for the convention. Details coming soon."
    />
  )
}
