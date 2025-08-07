"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard/ui/card";
import React from "react";

type EventType = "Workshop" | "Assessment" | "Meeting";

interface Event {
  title: string;
  time: string;
  type: EventType;
}

const eventTypeStyles: Record<EventType, string> = {
  Workshop: "bg-blue-100 text-blue-800",
  Assessment: "bg-purple-100 text-purple-800",
  Meeting: "bg-amber-100 text-amber-800"
};

const eventTypeDots: Record<EventType, string> = {
  Workshop: "bg-blue-500",
  Assessment: "bg-purple-500",
  Meeting: "bg-amber-500"
};

export const UpcomingEvents = () => {
  const events: Event[] = [
    { title: "React Workshop", time: "Today, 2:00 PM", type: "Workshop" },
    { title: "Student Assessment", time: "Tomorrow, 10:00 AM", type: "Assessment" },
    { title: "Faculty Meeting", time: "Friday, 3:00 PM", type: "Meeting" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
        <CardDescription>Scheduled classes and meetings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div 
              key={`${event.title}-${index}`} 
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${eventTypeDots[event.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{event.title}</p>
                <p className="text-sm text-gray-600">{event.time}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${eventTypeStyles[event.type]}`}>
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};