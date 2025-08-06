"use client";
import React from "react";
import { CalendarClock, MapPin, Clock } from "lucide-react";

import Link from 'next/link';

const events = [
  {
    date: { month: "JUN", day: "18" },
    title: "Global Alumni Leadership Summit",
    location: "Grand Hall, Main Campus",
    time: "10:00 AM - 4:00 PM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo.",
    link: "#",
  },
  {
    date: { month: "JUL", day: "25" },
    title: "Networking Mixer & Career Fair",
    location: "Metropolitan Hotel Conference Center",
    time: "6:30 PM - 9:00 PM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo.",
    link: "#",
  },
  {
    date: { month: "SEP", day: "09" },
    title: "Homecoming Weekend 2023",
    location: "University Campus",
    time: "All Weekend",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo.",
    link: "#",
  },
];

const AlumniEvents = () => {
  return (
    <section className="bg-gray-50 py-16  px-4 md:px-8 w-full">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Upcoming Alumni Events
        </h2>
        <p className="text-gray-600 mb-12">
          Connect with fellow graduates at these exclusive gatherings
        </p>

        <div className="space-y-6 w-full">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-start justify-between gap-4 w-full group transition duration-700 transform hover:scale-[1.02]"
            >
              {/* Date */}
              <div className="bg-emerald-100 text-emerald-800 font-bold text-center w-16 py-2 hover:bg-[#0F9255] hover:text-white rounded-lg flex-shrink-0">
                <div className="text-xs">{event.date.month}</div>
                <div className="text-2xl">{event.date.day}</div>
              </div>

              {/* Event Info */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {event.title}
                </h3>
                <div className="bg-emerald-50 rounded-lg p-2 mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{event.description}</p>
              </div>

              {/* Register Button */}
              <div className="self-center md:self-start">
                <a
                  href={event.link}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-emerald-700 transition"
                >
                  Register
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/events"
            className="text-sm font-semibold text-gray-800 hover:underline flex items-center justify-center gap-1"
          >
            View Full Events Calendar
            <CalendarClock className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AlumniEvents;
