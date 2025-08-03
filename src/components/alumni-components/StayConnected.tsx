"use client";
import React from "react";
import {
  Users2,
  CalendarDays,
  Gift,
  Briefcase,
} from "lucide-react"; // Icons (you can replace or use HeroIcons)

const items = [
  {
    icon: <Users2 className="h-8 w-8 text-emerald-600" />,
    title: "Mentorship Program",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada.",
    linkText: "Become a Mentor",
    href: "#",
  },
  {
    icon: <CalendarDays className="h-8 w-8 text-emerald-600" />,
    title: "Alumni Events",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada.",
    linkText: "Upcoming Events",
    href: "#",
  },
  {
    icon: <Gift className="h-8 w-8 text-emerald-600" />,
    title: "Give Back",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada.",
    linkText: "Support Our Mission",
    href: "#",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-emerald-600" />,
    title: "Career Network",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada.",
    linkText: "Join Network",
    href: "#",
  },
];

const StayConnected = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          How to Stay Connected
        </h2>
        <p className="text-gray-600 mb-12">
          Ways to engage with the community and make a difference
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (

            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-emerald-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center hover:bg-[#0F9255] hover:text-white">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <a
                href={item.href}
                className="text-emerald-600 font-semibold hover:underline"
              >
                {item.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayConnected;