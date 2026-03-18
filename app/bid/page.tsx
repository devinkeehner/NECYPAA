import type { Metadata } from "next"
import PageShell from "@/components/page-shell"

export const metadata: Metadata = {
  title: "Start a Bid — NECYPAA XXXVI",
  description: "Learn how to start a bid to host a future NECYPAA convention. Requirements, timeline, process, and resources.",
}

export default function BidPage() {
  return (
    <PageShell
      badge="Bidding"
      title="How to Start a Bid"
      subtitle="Interested in hosting a future NECYPAA? Here's everything you need to know about the bidding process."
    />
  )
}
