"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard/ui/card";
import { Award } from "lucide-react";

interface Course {
  name: string;
  students: number;
  rating: number;
}

export const CoursePerformance = () => {
  const courses: Course[] = [
    { name: "JavaScript Fundamentals", students: 342, rating: 4.9 },
    { name: "React Development", students: 289, rating: 4.8 },
    { name: "Node.js Backend", students: 156, rating: 4.7 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Course Performance</CardTitle>
        <CardDescription>Top performing courses this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{course.name}</p>
                <p className="text-sm text-gray-600">{course.students} students</p>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};