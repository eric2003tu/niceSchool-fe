"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard/ui/card";
import { Button } from "./ui/button";
import { Clock } from "lucide-react";

interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

export const RecentActivity = () => {
  const activities: Activity[] = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "completed",
      target: "JavaScript Fundamentals",
      time: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      user: "Mike Chen",
      action: "enrolled in",
      target: "React Advanced Course",
      time: "4 hours ago",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      user: "Emily Davis",
      action: "submitted",
      target: "Final Project",
      time: "6 hours ago",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Latest student activities and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <img
                src={activity.avatar}
                alt={activity.user}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            View All Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};