import { Clock, MapPin, CalendarDays } from 'lucide-react';

const events = [
  {
    month: 'FEB',
    day: '15',
    year: '2025',
    category: 'ACADEMIC',
    categoryColor: 'bg-blue-100 text-blue-700',
    title: 'Science Fair Exhibition',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    time: '09:00 AM - 03:00 PM',
    location: 'Main Auditorium',
  },
  {
    month: 'MAR',
    day: '10',
    year: '2025',
    category: 'SPORTS',
    categoryColor: 'bg-green-100 text-green-700',
    title: 'Annual Sports Day',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
    time: '08:30 AM - 05:00 PM',
    location: 'School Playground',
  },
  {
    month: 'APR',
    day: '22',
    year: '2025',
    category: 'ARTS',
    categoryColor: 'bg-pink-100 text-pink-700',
    title: 'Spring Music Concert',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
    time: '06:30 PM - 08:30 PM',
    location: 'Performing Arts Center',
  },
  {
    month: 'MAY',
    day: '8',
    year: '2025',
    category: 'COMMUNITY',
    categoryColor: 'bg-orange-100 text-orange-700',
    title: 'Parent-Teacher Conference',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
    time: '01:00 PM - 07:00 PM',
    location: 'Various Classrooms',
  },
];

export default function Event() {
  return (
    <section className="bg-[#f5f9f7] px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Events</h2>
        <p className="text-gray-500 mt-1">
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
        </p>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <select name='filter' className="border px-4 py-2 rounded-md w-60 text-gray-700 focus:outline-none">
          <option>All Months</option>
          {/* Add dynamic months if needed */}
        </select>
        <select name="category" className="border px-4 py-2 rounded-md w-60 text-gray-700 focus:outline-none border-green-700">
          <option>All Categories</option>
          {/* Add dynamic categories if needed */}
        </select>
      </div>

      {/* Event Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {events.map((event, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm flex overflow-hidden group transition duration-700 transform hover:scale-[1.02]">
            {/* Date Side */}
            <div className="bg-green-700 text-white px-4 py-6 flex flex-col items-center justify-center w-24">
              <span className="text-sm font-semibold">{event.month}</span>
              <span className="text-3xl font-bold">{event.day}</span>
              <span className="text-sm">{event.year}</span>
            </div>

            {/* Info Side */}
            <div className="p-5 flex-1">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${event.categoryColor}`}>
                {event.category}
              </span>
              <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>

              <div className="flex items-center text-gray-600 text-sm mt-4 gap-2">
                <Clock size={16} />
                {event.time}
              </div>
              <div className="flex items-center text-gray-600 text-sm mt-1 gap-2">
                <MapPin size={16} />
                {event.location}
              </div>

              <div className="flex gap-3 mt-4">
                <button className="bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded-full">
                  Learn More
                </button>
                <button className="border border-green-700 text-green-700 hover:bg-green-100 text-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <CalendarDays size={16} />
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Events Button */}
      <div className="flex justify-center mt-10">
        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow-md group transition duration-700 transform hover:scale-[1.02]">
          View All Events
        </button>
      </div>
    </section>
  );
}
