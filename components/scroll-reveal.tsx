"use client"

import { useScrollReveal } from "@/lib/use-scroll-reveal"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3
  as?: "div" | "section"
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>()
  const delayClass = delay > 0 ? `reveal-delay-${delay}` : ""

  return (
    <Tag ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </Tag>
  )
}
