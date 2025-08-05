"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin, ArrowRight, CalendarPlus } from "lucide-react";
import { format } from "date-fns";

// Expanded Events Data (18 events)
const allEvents = [
  {
    date: new Date(2023, 5, 15),
    title: "Annual Science Fair Exhibition",
    time: "09:00 AM - 04:00 PM",
    location: "Main Campus Auditorium",
    description: "Showcase of student science projects and innovations from across all departments.",
  },
  {
    date: new Date(2023, 5, 22),
    title: "Parent-Teacher Conference",
    time: "01:00 PM - 04:00 PM",
    location: "Multiple Classrooms",
    description: "Opportunity for parents to meet with teachers and discuss student progress.",
  },
  {
    date: new Date(2023, 5, 30),
    title: "Summer Sports Tournament Final",
    time: "02:30 PM - 05:30 PM",
    location: "Sports Complex",
    description: "Championship matches for basketball, volleyball, and soccer tournaments.",
  },
  {
    date: new Date(2023, 6, 5),
    title: "Graduation Ceremony Class of 2023",
    time: "10:00 AM - 01:00 PM",
    location: "Central Auditorium",
    description: "Celebration of our graduating students with keynote speaker and diploma ceremony.",
  },
  {
    date: new Date(2023, 6, 12),
    title: "Alumni Networking Mixer",
    time: "06:00 PM - 09:00 PM",
    location: "University Club",
    description: "Current students can connect with successful alumni from various industries.",
  },
  {
    date: new Date(2023, 6, 18),
    title: "Summer Research Symposium",
    time: "08:30 AM - 03:00 PM",
    location: "Research Hall",
    description: "Presentation of summer research projects by undergraduate and graduate students.",
  },
  {
    date: new Date(2023, 6, 25),
    title: "Study Abroad Fair",
    time: "11:00 AM - 02:00 PM",
    location: "Student Union",
    description: "Learn about international study opportunities and exchange programs.",
  },
  {
    date: new Date(2023, 7, 2),
    title: "New Student Orientation",
    time: "08:00 AM - 05:00 PM",
    location: "Various Campus Locations",
    description: "Welcome event for incoming freshmen and transfer students.",
  },
  {
    date: new Date(2023, 7, 9),
    title: "Faculty Development Workshop",
    time: "09:30 AM - 12:30 PM",
    location: "Faculty Center",
    description: "Training session on innovative teaching methods and curriculum development.",
  },
  {
    date: new Date(2023, 7, 16),
    title: "Career Services Open House",
    time: "10:00 AM - 02:00 PM",
    location: "Career Center",
    description: "Learn about resume building, interview skills, and internship opportunities.",
  },
  {
    date: new Date(2023, 7, 23),
    title: "Diversity and Inclusion Forum",
    time: "03:00 PM - 05:00 PM",
    location: "Diversity Center",
    description: "Panel discussion on creating an inclusive campus environment.",
  },
  {
    date: new Date(2023, 7, 30),
    title: "STEM Career Fair",
    time: "09:00 AM - 04:00 PM",
    location: "Engineering Building",
    description: "Meet with employers from science, technology, engineering, and math fields.",
  },
  {
    date: new Date(2023, 8, 6),
    title: "Arts and Humanities Showcase",
    time: "06:00 PM - 08:00 PM",
    location: "Performing Arts Center",
    description: "Exhibition of student work in visual arts, music, theater, and literature.",
  },
  {
    date: new Date(2023, 8, 13),
    title: "Health and Wellness Fair",
    time: "10:00 AM - 02:00 PM",
    location: "Recreation Center",
    description: "Free health screenings, fitness demonstrations, and wellness resources.",
  },
  {
    date: new Date(2023, 8, 20),
    title: "Entrepreneurship Competition",
    time: "01:00 PM - 05:00 PM",
    location: "Business School",
    description: "Student teams pitch their business ideas to a panel of investors.",
  },
  {
    date: new Date(2023, 8, 27),
    title: "Homecoming Football Game",
    time: "02:00 PM - 05:00 PM",
    location: "University Stadium",
    description: "Cheer on our team during the annual homecoming celebration.",
  },
  {
    date: new Date(2023, 9, 4),
    title: "Fall Career Fair",
    time: "10:00 AM - 03:00 PM",
    location: "Student Union Ballroom",
    description: "Connect with employers from various industries seeking to hire students.",
  },
  {
    date: new Date(2023, 9, 11),
    title: "Research Grant Deadline",
    time: "05:00 PM",
    location: "Online Submission",
    description: "Deadline for undergraduate research grant applications.",
  },
];

// Featured Event
const featuredEvent = {
  title: "Annual Arts Festival",
  dateRange: "July 15-17, 2023",
  description: "Three-day celebration of student creativity featuring visual arts, performances, and workshops.",
  image: "blog-post-1.webp", // Update to your image path
};

const EVENTS_PER_PAGE = 6;

const addToCalendar = (event: typeof allEvents[0]) => {
  // Format the date for the calendar
  const startDate = format(event.date, "yyyyMMdd");
  const endDate = format(event.date, "yyyyMMdd");
  
  // Extract start and end times (simplified parsing)
  const timeParts = event.time.split(" - ");
  const startTime = timeParts[0].replace(" ", "").toUpperCase();
  const endTime = timeParts[1] ? timeParts[1].replace(" ", "").toUpperCase() : "235900";
  
  // Create Google Calendar URL
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}T${startTime.replace(":", "")}00/${endDate}T${endTime.replace(":", "")}00&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
  
  // Create iCal download
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${startDate}T${startTime.replace(":", "")}00`,
    `DTEND:${endDate}T${endTime.replace(":", "")}00`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\n");
  
  const icsBlob = new Blob([icsContent], { type: "text/calendar" });
  const icsUrl = URL.createObjectURL(icsBlob);
  
  // Open a dropdown or directly trigger download
  window.open(googleCalendarUrl, "_blank");
  const link = document.createElement("a");
  link.href = icsUrl;
  link.setAttribute("download", `${event.title.replace(/\s+/g, "_")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentPage, setCurrentPage] = useState(1);

  const eventDates = allEvents.map((e) => e.date);
  const totalPages = Math.ceil(allEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = allEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 max-w-7xl mx-auto">
        {/* Events List */}
        <div className="flex flex-col gap-6">
          {paginatedEvents.map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm flex overflow-hidden">
              {/* Date Block */}
              <div className="bg-green-700 text-white px-5 py-6 flex flex-col items-center justify-center w-24 min-w-[96px]">
                <span className="text-sm font-semibold">{format(event.date, "dd")}</span>
                <span className="text-xs uppercase">{format(event.date, "MMM")}</span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-600 gap-2 mb-1">
                  <Clock size={16} /> {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-2 mb-2">
                  <MapPin size={16} /> {event.location}
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="mt-3 flex justify-between items-center">
                  <button className="text-green-700 hover:underline text-sm font-semibold flex items-center gap-1">
                    Learn More <ArrowRight size={14} />
                  </button>
                  <button 
                    onClick={() => addToCalendar(event)}
                    className="text-green-700 hover:text-green-800 text-sm font-semibold flex items-center gap-1 border border-green-700 px-3 py-1 rounded"
                  >
                    <CalendarPlus size={14} /> Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav className="flex gap-2 items-center text-gray-700">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded border ${currentPage === page ? 'bg-green-600 text-white' : 'bg-white hover:bg-green-100'}`}
                >
                  {page}
                </button>
              ))}
              {currentPage < totalPages && (
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-8 h-8 rounded border bg-white hover:bg-green-100"
                >
                  <ArrowRight size={16} />
                </button>
              )}
            </nav>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          {/* Calendar */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h4>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{ hasEvent: eventDates }}
              modifiersClassNames={{ hasEvent: "event-dot" }}
              className="rounded-md border"
            />
          </div>

          {/* Featured Event */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src={featuredEvent.image} alt="Featured Event" className="w-full h-40 object-cover" />
            <div className="p-5">
              <h5 className="text-lg font-semibold text-gray-900 mb-1">{featuredEvent.title}</h5>
              <p className="text-sm text-gray-600 mb-2">{featuredEvent.dateRange}</p>
              <p className="text-sm text-gray-600 mb-3">{featuredEvent.description}</p>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full">
                Register Now
              </button>
            </div>
          </div>

          {/* Event Categories */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Event Categories</h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm text-gray-700">Academic <span>(12)</span></li>
              <li className="flex justify-between text-sm text-gray-700">Sports <span>(8)</span></li>
              <li className="flex justify-between text-sm text-gray-700">Cultural <span>(6)</span></li>
              <li className="flex justify-between text-sm text-gray-700">Workshops <span>(4)</span></li>
              <li className="flex justify-between text-sm text-gray-700">Conferences <span>(2)</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}