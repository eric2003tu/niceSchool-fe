"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/dashboard/ui/card";
import { Calendar, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpcomingEvents } from "./upcoming-events";

interface Class {
  id: number;
  time: string;
  name: string;
  instructor: string;
  room: string;
}

export const SchedulePage = () => {
  const classes: Class[] = [
    { id: 1, time: "9:00 AM", name: "JavaScript Fundamentals", instructor: "Prof. Smith", room: "Room A" },
    { id: 2, time: "11:00 AM", name: "React Basics", instructor: "Prof. Johnson", room: "Room B" },
    { id: 3, time: "2:00 PM", name: "Node.js Workshop", instructor: "Prof. Davis", room: "Online" },
    { id: 4, time: "4:00 PM", name: "Office Hours", instructor: "Prof. Wilson", room: "Room C" }
  ];

  return (
    <main className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          {/* <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
            <p className="mt-1 text-sm text-gray-600">Manage classes and events</p>
          </div> */}
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today's Classes</CardTitle>
                <button className="text-sm text-emerald-600 hover:text-emerald-800">
                  View All
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Clock className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{classItem.name}</p>
                        <p className="text-sm text-gray-600">{classItem.instructor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{classItem.time}</p>
                      <p className="text-sm text-gray-600">{classItem.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <UpcomingEvents />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};