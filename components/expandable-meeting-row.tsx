"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface MeetingProps {
  day: string
  name: string
  time: string
  location: string
  address: string
  city: string
  types: string
  url?: string
  attendance?: string
}

export function ExpandableMeetingRow({ meeting }: { meeting: MeetingProps }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <tr className="border-b border-gray-700 hover:bg-gray-800">
        <td className="p-3 text-gray-300">{meeting.day}</td>
        <td className="p-3 text-gray-300">{meeting.time}</td>
        <td className="p-3 text-gray-300">
          {meeting.url ? (
            <a href={meeting.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {meeting.name}
            </a>
          ) : (
            meeting.name
          )}
        </td>
        <td className="p-3 text-gray-300">{meeting.location}</td>
        <td className="p-3 text-gray-300">{meeting.city}</td>
        <td className="p-3 text-gray-300">{meeting.attendance}</td>
        <td className="p-3 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 hover:text-blue-300 focus:outline-none"
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-800 border-b border-gray-700">
          <td colSpan={7} className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-1">Address:</h4>
                <p className="text-gray-300">{meeting.address || "No address provided"}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-1">Meeting Types:</h4>
                <p className="text-gray-300">{meeting.types || "No types specified"}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
