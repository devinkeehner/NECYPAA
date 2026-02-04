"use client"

import Image from "next/image"
import Link from "next/link"
import { MobileMenu } from "@/components/mobile-menu"
import { MeetingCard } from "@/components/meeting-card"
import { ExpandableMeetingRow } from "@/components/expandable-meeting-row"
import { useState } from "react"
import FlyerModal from "@/components/flyer-modal"
import { ZoomIn } from "lucide-react"
import FlyerWithModal from "@/components/flyer-with-modal" // Declare the variable before using it

// Meeting data organized by day with updated information
const meetingsByDay = {
  Sunday: [
    {
      name: "A Vision For Us",
      time: "7:30 PM",
      location: "Sacred Heart Church School",
      city: "Danbury",
      address: "12 Cottage St",
      types: "Discussion, Online Meeting, Open, Wheelchair Access, Wheelchair-Accessible Bathroom, Young People",
      url: "https://ct-aa.org/meetings/do-it-sober-young-peoples-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person and Online",
    },
    {
      name: "UConn Young Peoples",
      time: "7:30 PM",
      location: "Storrs Congregational Church",
      city: "Storrs",
      address: "2 N Eagleville Rd",
      types: "Discussion, Open, Speaker, Wheelchair Access, Young People",
      url: "https://ct-aa.org/meetings/sunday-nite-live-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
  ],
  Monday: [
    {
      name: "Y.A.N.A. Young Peoples Group",
      time: "6:00 PM",
      location: "Wolcott Activ & Learning Center",
      city: "Wolcott",
      address: "48 Todd Rd",
      types: "Discussion, Open, Wheelchair Access, Wheelchair-Accessible Bathroom, Young People",
      url: "https://ct-aa.org/meetings/y-a-n-a-young-peoples/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Coventry Young Peoples Group",
      time: "7:00 PM",
      location: "Second Congregational Church",
      city: "Coventry",
      address: "1746 Boston Turnpike",
      types: "Discussion, Open, Young People",
      url: "https://ct-aa.org/meetings/coventry-young-peoples-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Beyond Your Wildest Dreams Group",
      time: "8:00 PM",
      location: "First Baptist Church",
      city: "New Haven",
      address: "205 Edwards St",
      types: "Closed, Step Meeting, Young People",
      url: "https://ct-aa.org/meetings/beyond-your-wildest-dreams-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
  ],
  Tuesday: [
    {
      name: "Forever Young Group",
      time: "7:00 PM",
      location: "Bethany Lutheran Church",
      city: "West Hartford",
      address: "1655 Boulevard",
      types: "Discussion, Open, Wheelchair Access, Young People",
      url: "https://ct-aa.org/meetings/forever-young-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Choices Young Peoples Group",
      time: "7:00 PM",
      location: "Walnut Hill Community Church",
      city: "Waterbury",
      address: "274 Bunker Hill Ave",
      types: "Discussion, Open, Young People",
      url: "https://ct-aa.org/meetings/choices-young-peoples-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Canton Young People's-Open Topic Discussion",
      time: "7:30 PM",
      location: "First Congregational Church",
      city: "Canton",
      address: "184 Cherry Brook Rd",
      types: "Discussion, Open, Young People",
      url: "https://ct-aa.org/meetings/canton-young-peoples-open-topic-discussion/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Your Not Alone",
      time: "7:30 PM",
      location: "ZOOM ID: 463 705 209, Password: 123795",
      city: "Online",
      address: "",
      types: "Discussion, Online Meeting, Open, Young People",
      url: "https://ct-aa.org/meetings/tuesday-night-young-peoples-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "Online",
    },
    {
      name: "The Steps to Serenity",
      time: "7:30 PM",
      location: "Grace Lutheran Church",
      city: "Middletown",
      address: "1055 Randolph Rd",
      types: "Closed, Discussion, Step Meeting, Wheelchair Access, Wheelchair-Accessible Bathroom, Young People",
      url: "https://ct-aa.org/meetings/tuesday-step-meeting-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Canaan Young Peoples Group",
      time: "8:00 PM",
      location: "Canaan United Methodist Church",
      city: "Canaan",
      address: "4 Church St",
      types: "Open, Speaker, Young People",
      url: "https://ct-aa.org/meetings/canaan-young-peoples-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
  ],
  Wednesday: [
    {
      name: "Young People's Greenwich",
      time: "7:00 PM",
      location: "YWCA",
      city: "Greenwich",
      address: "259 E Putnam Ave",
      types: "Wheelchair Access, Young People",
      url: "https://ct-aa.org/meetings/young-peoples-greenwich/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
  ],
  Thursday: [
    {
      name: "Deep River Young People's Meeting",
      time: "7:00 PM",
      location: "First Congregational Church",
      city: "Deep River",
      address: "1 Church St",
      types: "Discussion, Newcomer, Open, Young People",
      url: "https://ct-aa.org/meetings/deep-river-beginners-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Young and the Restless Group",
      time: "7:30 PM",
      location: "Long Hill United Methodist Church",
      city: "Trumbull",
      address: "6358 Main St",
      types: "Discussion, Online Meeting, Open, Wheelchair Access, Young People",
      url: "https://ct-aa.org/meetings/young-restless/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person and Online",
    },
  ],
  Friday: [
    {
      name: "Guilford Young People's",
      time: "7:00 PM",
      location: "Guilford Athletic Center",
      city: "Guilford",
      address: "391 Soundview Rd",
      types: "Discussion, Open, Young People",
      url: "https://ct-aa.org/meetings/guilford-young-peoples/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Enfield Young People's Group",
      time: "7:00 PM",
      location: "United Methodist Church",
      city: "Enfield",
      address: "330 Hazard Ave",
      types: "Discussion, Open, Speaker, Young People",
      url: "https://ct-aa.org/meetings/enfield-young-peoples/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Young Grenadiers",
      time: "7:30 PM",
      location: "St James Episcopal Church",
      city: "Farmington",
      address: "3 Mountain Rd",
      types: "Open, Step Meeting, Young People",
      url: "https://ct-aa.org/meetings/steppin-free-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "The Joy of Living Group",
      time: "8:00 PM",
      location: "Bible Church of Waterbury",
      city: "Waterbury",
      address: "240 Dwight St",
      types: "Discussion, Open, Speaker, Step Meeting, Wheelchair Access, Wheelchair-Accessible Bathroom, Young People",
      url: "https://ct-aa.org/meetings/the-joy-of-living/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
  ],
  Saturday: [
    {
      name: "Saturday Morning BYOC Group",
      time: "9:30 AM",
      location: "Colchester Federated Church",
      city: "Colchester",
      address: "60 Main St",
      types: "Discussion, Online Meeting, Open, Step Meeting, Young People",
      url: "https://ct-aa.org/meetings/saturday-morning-byoc-group/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person and Online",
    },
    {
      name: "Never Too Young",
      time: "5:30 PM",
      location: "Greens Farms Church",
      city: "Westport",
      address: "71 Hillandale Rd",
      types: "Discussion, Newcomer, Open, Young People",
      url: "https://ct-aa.org/meetings/never-too-young-2/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Young and The Restless SHU",
      time: "7:00 PM",
      location: "SHU Campus",
      city: "Fairfield",
      address: "5401 Park Ave",
      types:
        "Discussion, English, Literature, Open, Speaker, Wheelchair Access, Wheelchair-Accessible Bathroom, Young People",
      url: "https://ct-aa.org/meetings/young-the-restless-shu/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
    {
      name: "Never Too Young Group",
      time: "7:00 PM",
      location: "South Congregational Church",
      city: "South Glastonbury",
      address: "949 Main St",
      types: "Discussion, Open, Wheelchair Access, Wheelchair-Accessible Bathroom, Young People",
      url: "https://ct-aa.org/meetings/never-too-young/?tsml-day=any&tsml-distance=100&tsml-mode=location&tsml-query=06106&tsml-type=Y",
      attendance: "In-person",
    },
  ],
}

// All meetings for the table view
const allMeetings = Object.entries(meetingsByDay).flatMap(([day, meetings]) =>
  meetings.map((meeting) => ({ day, ...meeting })),
)

export default function HomePage() {
  // State for modal
  const [enlargedFlyer, setEnlargedFlyer] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0f172a" }}>
      {/* FlyerModal component */}
      <FlyerModal
        src={enlargedFlyer?.src || ""}
        alt={enlargedFlyer?.alt || ""}
        isOpen={!!enlargedFlyer}
        onClose={() => setEnlargedFlyer(null)}
      />

      <header className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400">NECYPAA CT HOST</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="#purpose" className="text-gray-300 hover:text-blue-400 font-medium uppercase">
              NECYPAA'S PURPOSE
            </Link>
            <Link href="#meetings" className="text-gray-300 hover:text-blue-400 font-medium uppercase">
              YP MEETINGS
            </Link>
            <Link
              href="https://necypaa.org/"
              className="text-gray-300 hover:text-blue-400 font-medium uppercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              ADVISORY
            </Link>
            <Link
              href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1770049957031&key=GRP&app=resvlink"
              className="text-gray-300 hover:text-blue-400 font-medium uppercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              BOOK HOTEL
            </Link>
            <Link
              href="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-medium uppercase transition-colors"
            >
              REGISTER
            </Link>
          </nav>
          <MobileMenu />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-8 md:p-16 rounded-3xl shadow-2xl overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-pulse delay-150"></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-300"></div>
            </div>

            {/* Confetti-like decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-[10%] w-3 h-3 bg-yellow-400 rotate-45 opacity-60"></div>
              <div className="absolute top-40 right-[15%] w-2 h-2 bg-blue-300 rounded-full opacity-70"></div>
              <div className="absolute bottom-32 left-[20%] w-4 h-4 bg-white rotate-12 opacity-50"></div>
              <div className="absolute top-[30%] right-[25%] w-3 h-3 bg-yellow-300 opacity-60"></div>
              <div className="absolute bottom-20 right-[35%] w-2 h-2 bg-blue-400 rounded-full opacity-70"></div>
              <div className="absolute top-[60%] left-[15%] w-3 h-3 bg-white rotate-45 opacity-50"></div>
            </div>

            <div className="relative z-10 text-center space-y-6">
              {/* Victory badge */}
              <div className="inline-block">
                <div className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-full font-bold text-sm md:text-base uppercase tracking-wider shadow-lg transform -rotate-2">
                  🎉 Connecticut Wins the Bid! 🎉
                </div>
              </div>

              {/* Main announcement with bold typography */}
              <div className="space-y-4">
                <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight drop-shadow-2xl">
                  NECYPAA
                  <span className="block text-yellow-400 mt-2">36</span>
                </h2>
                <p className="text-3xl md:text-5xl font-bold text-white">IS COMING TO</p>
                <p className="text-4xl md:text-6xl font-black text-blue-200 uppercase tracking-wide">Connecticut</p>
              </div>

              {/* Election info with bold design */}
              <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
                {/* Part One - Completed */}
                <div className="bg-white/60 text-slate-900 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    COMPLETED
                  </div>
                  <div className="bg-slate-500 text-white py-2 px-4 rounded-lg mb-4 inline-block">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-wide">Elections Part 1</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xl font-bold text-slate-500">
                      <div className="bg-slate-200 p-2 rounded-full">
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="line-through">Sunday, Feb 1st</span>
                    </div>
                    <div className="flex items-center gap-3 text-xl font-bold text-slate-500">
                      <div className="bg-slate-200 p-2 rounded-full">
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="line-through">2:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Part Two - Active */}
                <div className="bg-white text-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-yellow-400 relative">
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    UPCOMING
                  </div>
                  <div className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 inline-block">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-wide">Elections Part 2</h3>
                  </div>
                  <p className="text-red-500 font-bold italic mb-4 text-lg">Electric Boogaloo!</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xl font-bold">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span>Sunday, Feb 15th</span>
                    </div>
                    <div className="flex items-center gap-3 text-xl font-bold">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span>2:00 PM</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href="https://us06web.zoom.us/j/5692382899?omn=86491828124"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-lg py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-2xl uppercase tracking-wide"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.5 10.5l-4-2.5v5l4-2.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8z" />
                      </svg>
                      Join on Zoom
                    </a>
                  </div>
                </div>
              </div>

              {/* Elections Flyer */}
              <div className="max-w-sm mx-auto mt-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NECYPAA%20vote%20%285%29-DVPawFt9UO18OIBM5xL8ivnvkR2rTZ.png"
                  alt="NECYPAA CT Elections Part Two - February 15th"
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-2xl border-4 border-yellow-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Event - Zombie Prom */}
        <section className="mt-16 py-8">
          <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
            Upcoming Event
          </h2>
          
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Event Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <span className="inline-block bg-purple-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">SAVE THE DATE</span>
                  <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 mb-2">
                    Zombie Prom
                  </h3>
                  <p className="text-gray-400 text-lg">Hosted by NECYPAA 36 and The Bay State Bid for NECYPAA</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600/20 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Date</p>
                        <p className="text-white font-bold">Friday, February 13th</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600/20 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white font-bold">Enfield Congregational Church</p>
                        <p className="text-gray-400 text-xs">1295 Enfield Street, Enfield, CT 06082</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600/20 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Schedule</p>
                        <p className="text-white font-bold text-sm">Hype 6:30-7:00 | Meeting 7:00-8:00</p>
                        <p className="text-white font-bold text-sm">Dance 8:00-Dawn</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-600/20 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Suggested Contribution</p>
                        <p className="text-green-400 font-bold text-2xl">$15</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg">
                  Join us for a spooky night of dancing, fellowship, and fun! Dress in your best zombie prom attire and celebrate recovery with friends from across the North East.
                </p>
              </div>
              
              {/* Flyer */}
              <div className="lg:w-80 flex-shrink-0">
                <FlyerWithModal
                  src="/images/zombie-prom-flyer.jpeg"
                  alt="Zombie Prom - Friday February 13th"
                  title="Zombie Prom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section id="purpose" className="mt-16 py-8">
          <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
            NECYPAA'S PURPOSE
          </h2>
          <p className="text-lg text-gray-300 mb-4">
            The North East Convention of Young People in Alcoholics Anonymous (NECYPAA) was established in 1989 by an
            Advisory Council to organize an annual conference for young people in recovery within Alcoholics Anonymous
            (AA). NECYPAA plays a crucial role in spreading AA's message throughout the North East, providing a platform
            for young AA members to come together, share their experiences, and support each other.
          </p>
          <p className="text-lg text-gray-300">
            While the focus is on young people, individuals of all ages are welcome to attend NECYPAA conferences. It's
            important for non-alcoholics attending to respect the anonymity of all AA members present.
          </p>
        </section>

        {/* Past Events Section */}
        <section id="events" className="mt-16 py-8">
          <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
            Past Events
          </h2>

          <div className="space-y-6">
            {/* NYE Meeting 2026 */}
            <div className="group bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:shadow-blue-500/20 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Info on the left */}
                <div className="flex-1 space-y-3 text-gray-300">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">NYE Meeting 2026</h3>
                  <p>
                    <span className="font-semibold text-blue-400">Date:</span> Wednesday, December 31, 2025
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Location:</span> Bristol Recovery Club, 67 West St,
                    Bristol CT
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Schedule:</span>
                  </p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Meeting: 8:30 PM</li>
                    <li>Food/Dance/Party: 9:30 PM</li>
                  </ul>
                  <p>
                    <span className="font-semibold text-blue-400">Entertainment:</span> Balldrop Televised Live
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Cohost:</span> The Happy Hour Group & CT Bid for
                    NECYPAA
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Tickets:</span> $15 in advance, $20 at the door
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">RSVP:</span> Meadow 860-707-0268, Danielle
                    860-987-3956
                  </p>
                  <p className="mt-4 text-gray-400 italic">
                    A fantastic night of recovery, fellowship, and celebration to ring in 2026!
                  </p>
                </div>

                {/* Flyer on the right with frame */}
                <div className="w-full md:w-72 flex-shrink-0">
                  <div
                    className="relative bg-gray-900 p-3 rounded-lg border-2 border-gray-700 group-hover:border-blue-400 transition-colors duration-300 cursor-pointer"
                    onClick={() =>
                      setEnlargedFlyer({
                        src: "/images/50a7821a-d39f-4197-ac4e-efc919034db9.jpg",
                        alt: "NYE Meeting 2026 Flyer",
                      })
                    }
                  >
                    <Image
                      src="/images/50a7821a-d39f-4197-ac4e-efc919034db9.jpg"
                      alt="NYE Meeting 2026 Flyer"
                      width={400}
                      height={533}
                      className="rounded w-full h-auto object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-blue-500 p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trivia Night */}
            <div className="group bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:shadow-blue-500/20 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Info on the left */}
                <div className="flex-1 space-y-3 text-gray-300">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">Trivia Night</h3>
                  <p>
                    <span className="font-semibold text-blue-400">Date:</span> Saturday, December 13, 2025
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Time:</span> Starts at 6:30 PM
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Location:</span> Milford VFW, 422 Naugatuck Ave,
                    Milford CT
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Theme:</span> Knowledge Wins; Sobriety Shines
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Suggested Contribution:</span> $15
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Presented by:</span> CT Bid for NECYPAA
                  </p>
                  <p className="mt-4 text-gray-400 italic">
                    A fun evening of trivia, fellowship, and friendly competition to support our NECYPAA bid!
                  </p>
                </div>

                {/* Flyer on the right with frame */}
                <div className="w-full md:w-72 flex-shrink-0">
                  <div
                    className="relative bg-gray-900 p-3 rounded-lg border-2 border-gray-700 group-hover:border-blue-400 transition-colors duration-300 cursor-pointer"
                    onClick={() =>
                      setEnlargedFlyer({
                        src: "/images/a073eef2-301c-4220-ab01-45ca5a3e5ee6.jpg",
                        alt: "Trivia Night Flyer",
                      })
                    }
                  >
                    <Image
                      src="/images/a073eef2-301c-4220-ab01-45ca5a3e5ee6.jpg"
                      alt="Trivia Night Flyer"
                      width={400}
                      height={711}
                      className="rounded w-full h-auto object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-blue-500 p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RAVE HALLOWEEN 2.0 Event */}
            <div className="group bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:shadow-blue-500/20 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Info on the left */}
                <div className="flex-1 space-y-3 text-gray-300">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">RAVE HALLOWEEN 2.0</h3>
                  <p>
                    <span className="font-semibold text-blue-400">Date:</span> Thursday, November 7, 2025
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Location:</span> Bristol Recovery Club, 67 West St,
                    Bristol, CT 06010
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Schedule:</span>
                  </p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>7:30 PM - Meeting</li>
                    <li>8:30 PM - Rave</li>
                  </ul>
                  <p>
                    <span className="font-semibold text-blue-400">Attire:</span> Costumes, PJs, or whatever!
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Activities:</span> Dance, Games, Arts and Crafts
                  </p>
                  <p>Pizza will be provided</p>
                  <p>
                    <span className="font-semibold text-blue-400">Suggested contribution:</span> $10
                  </p>
                  <p className="mt-4 text-gray-400 italic">
                    One night of fright was never enough! An evening of dancing, games, arts and crafts, and fellowship
                    to support our NECYPAA bid.
                  </p>
                </div>

                {/* Flyer on the right with frame */}
                <div className="w-full md:w-72 flex-shrink-0">
                  <div
                    className="relative bg-gray-900 p-3 rounded-lg border-2 border-gray-700 group-hover:border-blue-400 transition-colors duration-300 cursor-pointer"
                    onClick={() =>
                      setEnlargedFlyer({
                        src: "/images/rave-halloween.jpeg",
                        alt: "RAVE HALLOWEEN 2.0 Event Flyer",
                      })
                    }
                  >
                    <Image
                      src="/images/rave-halloween.jpeg"
                      alt="RAVE HALLOWEEN 2.0 Event Flyer"
                      width={400}
                      height={533}
                      className="rounded w-full h-auto object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-blue-500 p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cardboard Masquerade Event */}
            <div className="group bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:shadow-blue-500/20 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Info on the left */}
                <div className="flex-1 space-y-3 text-gray-300">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">Cardboard Masquerade</h3>
                  <p>
                    <span className="font-semibold text-blue-400">Date:</span> Friday, May 30, 2025 at 7:30 PM
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Location:</span> 3 Mountain Rd, Farmington, CT 06032
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Suggested contribution:</span> $10
                  </p>
                  <p className="mt-4 text-gray-400 italic">
                    A night of mask-making, board games, pizza, and fellowship to support our NECYPAA bid! This event
                    featured a masquerade ball, DIY mask-making station, board games, and plenty of pizza and snacks.
                  </p>
                </div>

                {/* Flyer on the right with frame */}
                <div className="w-full md:w-72 flex-shrink-0">
                  <div
                    className="relative bg-gray-900 p-3 rounded-lg border-2 border-gray-700 group-hover:border-blue-400 transition-colors duration-300 cursor-pointer"
                    onClick={() =>
                      setEnlargedFlyer({
                        src: "/flyer.png",
                        alt: "Cardboard Masquerade Event Flyer",
                      })
                    }
                  >
                    <Image
                      src="/flyer.png"
                      alt="Cardboard Masquerade Event Flyer"
                      width={400}
                      height={533}
                      className="rounded w-full h-auto object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-blue-500 p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Night, Pajama Party & Half-Assed Rave Event */}
            <div className="group bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:shadow-blue-500/20 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Info on the left */}
                <div className="flex-1 space-y-3 text-gray-300">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">Game Night, Pajama Party & Half-Assed Rave</h3>
                  <p>
                    <span className="font-semibold text-blue-400">Date:</span> Friday, April 11, 2025
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Location:</span> Pathfinders Club, 102 Norman St,
                    Manchester, CT
                  </p>
                  <p>
                    <span className="font-semibold text-blue-400">Schedule:</span>
                  </p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>7:30 PM - Meeting: "Happy, Joyous, and Free" Panel</li>
                    <li>8:30 PM - Games and Fellowship</li>
                  </ul>
                  <p>
                    <span className="font-semibold text-blue-400">Suggested donation:</span> $10
                  </p>
                  <p className="mt-4 text-gray-400 italic">
                    A fun night of games, fellowship, and a half-assed rave to support our NECYPAA bid! Featured a panel
                    discussion, board games, and plenty of snacks.
                  </p>
                </div>

                {/* Flyer on the right with frame */}
                <div className="w-full md:w-72 flex-shrink-0">
                  <div
                    className="relative bg-gray-900 p-3 rounded-lg border-2 border-gray-700 group-hover:border-blue-400 transition-colors duration-300 cursor-pointer"
                    onClick={() =>
                      setEnlargedFlyer({
                        src: "/images/game-night.jpeg",
                        alt: "Game Night, Pajama Party & Half-Assed Rave Event Flyer",
                      })
                    }
                  >
                    <Image
                      src="/images/game-night.jpeg"
                      alt="Game Night, Pajama Party & Half-Assed Rave Event Flyer"
                      width={400}
                      height={533}
                      className="rounded w-full h-auto object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-blue-500 p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meetings Section */}
        <section id="meetings" className="mt-16 py-8">
          <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
            Young People's Meetings in Connecticut
          </h2>
          <p className="text-gray-300 mb-6">
            Click on any meeting name to view more details on the CT-AA website. Click the arrow to expand and see
            address and meeting types.
          </p>

          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="p-3 text-left text-gray-300 font-semibold">Day</th>
                  <th className="p-3 text-left text-gray-300 font-semibold">Time</th>
                  <th className="p-3 text-left text-gray-300 font-semibold">Meeting</th>
                  <th className="p-3 text-left text-gray-300 font-semibold">Location</th>
                  <th className="p-3 text-left text-gray-300 font-semibold">City</th>
                  <th className="p-3 text-left text-gray-300 font-semibold">Attendance</th>
                  <th className="p-3 text-center text-gray-300 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {allMeetings.map((meeting, index) => (
                  <ExpandableMeetingRow key={index} meeting={meeting} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards - Shown only on Mobile */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {Object.entries(meetingsByDay).map(([day, meetings]) => (
              <MeetingCard key={day} day={day} meetings={meetings} />
            ))}
          </div>

          {/* Add Meeting Information */}
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Add Your Meeting</h3>
            <p className="text-gray-300 mb-4">
              Know of a young people's meeting that's not on our list? Email us with the details and we'll add it!
            </p>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400 mr-2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:ctbidfornecypaa@gmail.com" className="text-blue-400 hover:underline">
                ctbidfornecypaa@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">NECYPAA CT HOST</h2>
            <p className="text-gray-300 mb-4">New England Conference of Young People in AA</p>
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400 mr-2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:ctbidfornecypaa@gmail.com" className="text-blue-400 hover:underline">
                ctbidfornecypaa@gmail.com
              </a>
            </div>

          </div>
        </div>
      </footer>
    </div>
  )
}
