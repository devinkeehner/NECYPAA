"use client"

import { Search, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface FlyerWithModalProps {
  src: string
  alt: string
  title?: string
  className?: string
}

export default function FlyerWithModal({ src, alt, className = "" }: FlyerWithModalProps) {
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <>
      {/* Flyer with enlarge button */}
      <div className={`relative group cursor-pointer ${className}`} onClick={() => setIsOpen(true)}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={400}
          height={600}
          className="w-full h-full object-contain rounded-lg"
        />
        {/* Magnifying glass icon in upper right */}
        <button
          className="absolute top-2 right-2 p-2 bg-blue-600/80 hover:bg-blue-600 rounded-full transition-all opacity-70 group-hover:opacity-100"
          aria-label="Click to enlarge"
        >
          <Search className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8" 
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
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
      )}
    </>
  )
}
