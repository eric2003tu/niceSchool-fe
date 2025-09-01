"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/dashboard/ui/card";
import { BookOpen, Plus, MoreVertical, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  description: string;
  students: number;
  duration: string;
  rating: number;
}

export const CoursesPage = () => {
  const courses: Course[] = [
    { id: 1, title: "JavaScript Fundamentals", description: "Learn core JavaScript concepts", students: 342, duration: "8 weeks", rating: 4.8 },
    { id: 2, title: "React Development", description: "Build modern web applications", students: 289, duration: "6 weeks", rating: 4.9 },
    { id: 3, title: "Node.js Backend", description: "Server-side JavaScript development", students: 156, duration: "10 weeks", rating: 4.7 },
    { id: 4, title: "TypeScript Mastery", description: "Static typing for JavaScript", students: 98, duration: "4 weeks", rating: 4.6 },
    { id: 5, title: "GraphQL API Design", description: "Modern API development", students: 76, duration: "5 weeks", rating: 4.8 },
    { id: 6, title: "UI/UX Principles", description: "Design fundamentals", students: 120, duration: "6 weeks", rating: 4.5 }
  ];

  return (
    <main className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          {/* <div>
            <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
            <p className="mt-1 text-sm text-gray-600">Manage and monitor all courses</p>
          </div> */}
          <Link href='/dashboard/courses' className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Course
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <Button className="p-2 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                  <span>{course.students} students</span>
                  <span>{course.duration}</span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {course.rating}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};