import type { Metadata } from "next"
import PageShell from "@/components/page-shell"

export const metadata: Metadata = {
  title: "NECYBLOG — NECYPAA XXXVI",
  description: "Stories, updates, and reflections from the NECYPAA XXXVI CT Host Committee and the fellowship.",
}

export default function BlogPage() {
  return (
    <PageShell
      badge="NECYBLOG"
      title="NECYBLOG"
      subtitle="Stories, updates, and reflections from the road to Hartford. First posts coming soon."
    />
  )
}
