"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

interface FlyerModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export default function FlyerModal({ src, alt, isOpen, onClose }: FlyerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={1200}
          height={1600}
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  )
}
