import Image from "next/image"
import Link from "next/link"
import { MobileMenu } from "@/components/mobile-menu"
import { MeetingCard } from "@/components/meeting-card"
import { ExpandableMeetingRow } from "@/components/expandable-meeting-row"

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400">NECYPAA CT BID</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="#purpose" className="text-gray-300 hover:text-blue-400 font-medium uppercase">
              NECYPAA'S PURPOSE
            </Link>
            <Link href="#events" className="text-gray-300 hover:text-blue-400 font-medium uppercase">
              EVENTS
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
              href="https://www.necypaa35.org/"
              className="text-gray-300 hover:text-blue-400 font-medium uppercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              NECYPAA XXXV HOST
            </Link>
          </nav>
          <MobileMenu />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-8">
          <div className="md:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Join Us for <span className="text-blue-400">RAVE HALLOWEEN 2.0</span>
            </h2>
            <p className="text-lg text-gray-300">
              One night of fright was never enough! Join us for an evening of dancing, games, arts and crafts, and
              fellowship to support our NECYPAA bid.
            </p>
            <div className="flex flex-col gap-2 text-gray-300">
              <p className="text-xl font-semibold text-blue-400">November 7th, 2025</p>
              <p>Meeting: 7:30 PM | Rave: 8:30 PM</p>
              <p>Bristol Recovery Club</p>
              <p>67 West St, Bristol, CT 06010</p>
              <p className="mt-2">
                <span className="font-semibold">Attire:</span> Costumes, PJs, or whatever!
              </p>
              <p>
                <span className="font-semibold">Suggested contribution:</span> $10
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative w-full max-w-md mx-auto md:max-w-none">
              <Image
                src="/images/rave-halloween.jpeg"
                alt="Rave Halloween 2.0 Event Flyer"
                width={600}
                height={600}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section id="purpose" className="mt-16 py-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">NECYPAA'S PURPOSE</h2>
          <p className="text-lg text-gray-300 mb-4">
            The New England Conference of Young People in Alcoholics Anonymous (NECYPAA) was established in 1989 by an
            Advisory Council to organize an annual conference for young people in recovery within Alcoholics Anonymous
            (AA). NECYPAA plays a crucial role in spreading AA's message throughout New England, providing a platform
            for young AA members to come together, share their experiences, and support each other.
          </p>
          <p className="text-lg text-gray-300">
            While the focus is on young people, individuals of all ages are welcome to attend NECYPAA conferences. It's
            important for non-alcoholics attending to respect the anonymity of all AA members present.
          </p>
        </section>

        {/* Events Section */}
        <section id="events" className="mt-16 py-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-2">RAVE HALLOWEEN 2.0</h3>
              <p className="text-gray-300 mb-2">Thursday, November 7, 2025</p>
              <p className="text-gray-300 mb-2">Meeting: 7:30 PM | Rave: 8:30 PM</p>
              <p className="text-gray-300 mb-4">67 West St, Bristol, CT 06010</p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Attire:</span> Costumes, PJs, or whatever!
              </p>
              <p className="text-gray-300 mb-4">
                <span className="font-semibold">Activities:</span> Dance, Games, Arts and Crafts
              </p>
              <p className="text-gray-300 mb-2">Pizza will be provided</p>
              <p className="text-gray-300">
                <span className="font-semibold">Suggested contribution:</span> $10
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <h3 className="text-xl font-bold text-blue-400 mb-2">The Bid Committee Meeting</h3>
              <p className="text-gray-300 mb-4">Third Sunday of the month</p>
              <p className="text-gray-300 mb-4">2:00 PM - 4:00 PM</p>
              <p className="text-gray-300 mb-4">Zoom Meeting (Online Only)</p>
              <p className="text-gray-300">Help us plan and organize our bid for NECYPAA!</p>
            </div>
          </div>
        </section>

        {/* Past Events Section */}
        <section className="mt-16 py-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Past Events</h2>

          {/* Cardboard Masquerade Event Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 mb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="relative w-full max-w-xs mx-auto">
                  <Image
                    src="/flyer.png"
                    alt="Cardboard Masquerade Event Flyer"
                    width={600}
                    height={800}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-blue-400 mb-3">Cardboard Masquerade</h3>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Date:</span> Friday, May 30, 2025 at 7:30 PM
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Location:</span> 3 Mountain Rd, Farmington, CT 06032
                </p>
                <p className="text-gray-300 mb-4">
                  <span className="font-semibold">Suggested contribution:</span> $10
                </p>
                <p className="text-gray-300">
                  A night of mask-making, board games, pizza, and fellowship to support our NECYPAA bid! This event
                  featured a masquerade ball, DIY mask-making station, board games, and plenty of pizza and snacks.
                </p>
              </div>
            </div>
          </div>

          {/* Game Night, Pajama Party & Half-Assed Rave Event Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 mb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="relative w-full max-w-xs mx-auto">
                  <Image
                    src="/images/game-night.jpeg"
                    alt="Game Night, Pajama Party & Half-Assed Rave Event Flyer"
                    width={600}
                    height={800}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-blue-400 mb-3">Game Night, Pajama Party & Half-Assed Rave</h3>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Date:</span> Friday, April 11, 2025
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Location:</span> Pathfinders Club, 102 Norman St, Manchester, CT
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Schedule:</span>
                </p>
                <ul className="text-gray-300 mb-2 ml-4 list-disc">
                  <li>7:30 PM - Meeting: "Happy, Joyous, and Free" Panel</li>
                  <li>8:30 PM - Games and Fellowship</li>
                </ul>
                <p className="text-gray-300 mb-4">
                  <span className="font-semibold">Suggested donation:</span> $10
                </p>
                <p className="text-gray-300">
                  A fun-filled evening featuring a panel discussion followed by games and fellowship. Attendees were
                  encouraged to wear costumes, pajamas, or whatever they felt comfortable in!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meetings Section */}
        <section id="meetings" className="mt-16 py-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">Young People's Meetings in Connecticut</h2>
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
            <h2 className="text-2xl font-bold text-blue-400 mb-4">NECYPAA CT BID</h2>
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
            <p className="mt-8 text-gray-400">
              &copy; {new Date().getFullYear()} NECYPAA CT Bid Committee. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
