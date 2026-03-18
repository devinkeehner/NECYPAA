"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import { useFocusTrap } from "@/lib/use-focus-trap"

interface FlyerModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export default function FlyerModal({ src, alt, isOpen, onClose }: FlyerModalProps) {
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose()
      }
      window.addEventListener("keydown", handleEscape)
      return () => window.removeEventListener("keydown", handleEscape)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- backdrop dismiss is supplementary to Escape key and close button
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8" role="dialog" aria-modal="true" aria-label="Enlarged flyer image" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- stopPropagation on image container prevents accidental close */}
      <div
        className="relative w-auto max-w-[90vw] h-auto max-h-[calc(100vh-4rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={1200}
          height={1600}
          className="w-auto h-auto max-w-full max-h-[calc(100vh-4rem)] object-contain rounded-lg"
        />
      </div>
    </div>
  )
}
