"use client"

import { useState } from "react"
import Link from "next/link"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="text-gray-300 hover:text-blue-400 p-2" aria-label="Toggle menu">
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-900 border-b border-gray-800 p-4 z-50">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#purpose"
              className="text-gray-300 hover:text-blue-400 font-medium py-2 uppercase"
              onClick={toggleMenu}
            >
              NECYPAA'S PURPOSE
            </Link>
            <Link
              href="#events"
              className="text-gray-300 hover:text-blue-400 font-medium py-2 uppercase"
              onClick={toggleMenu}
            >
              EVENTS
            </Link>
            <Link
              href="#meetings"
              className="text-gray-300 hover:text-blue-400 font-medium py-2 uppercase"
              onClick={toggleMenu}
            >
              YP MEETINGS
            </Link>
            <Link
              href="https://necypaa.org/"
              className="text-gray-300 hover:text-blue-400 font-medium py-2 uppercase"
              onClick={toggleMenu}
              target="_blank"
              rel="noopener noreferrer"
            >
              ADVISORY
            </Link>
            <Link
              href="https://www.necypaa35.org/"
              className="text-gray-300 hover:text-blue-400 font-medium py-2 uppercase"
              onClick={toggleMenu}
              target="_blank"
              rel="noopener noreferrer"
            >
              NECYPAA XXXV HOST
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
