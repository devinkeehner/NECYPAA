interface MeetingCardProps {
  day: string
  meetings: Array<{
    name: string
    time: string
    location: string
    city: string
    address: string
    types: string
    url?: string
    attendance?: string
  }>
}

export function MeetingCard({ day, meetings }: MeetingCardProps) {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md border border-gray-800">
      <div className="bg-blue-900 text-white font-bold py-2 px-4 rounded-t-md mb-3">{day}</div>

      {meetings.map((meeting, index) => (
        <div
          key={`${day}-${meeting.name}-${index}`}
          className={`${index < meetings.length - 1 ? "mb-4 pb-4 border-b border-gray-800" : ""}`}
        >
          <h3 className="text-lg font-bold text-blue-400">
            {meeting.url ? (
              <a href={meeting.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {meeting.name}
              </a>
            ) : (
              meeting.name
            )}
          </h3>
          <p className="text-gray-300">
            <span className="text-gray-500">Time:</span> {meeting.time}
          </p>
          <p className="text-gray-300">
            <span className="text-gray-500">Location:</span> {meeting.location}
          </p>
          {meeting.address && (
            <p className="text-gray-300">
              <span className="text-gray-500">Address:</span> {meeting.address}
            </p>
          )}
          <p className="text-gray-300">
            <span className="text-gray-500">City:</span> {meeting.city}
          </p>
          {meeting.attendance && (
            <p className="text-gray-300">
              <span className="text-gray-500">Attendance:</span> {meeting.attendance}
            </p>
          )}
          {meeting.types && (
            <p className="text-gray-300">
              <span className="text-gray-500">Types:</span> {meeting.types}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
