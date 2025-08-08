"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/dashboard/ui/card";
import { Users, Plus, Search, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  progress: number;
  avatar: string;
}

export const StudentsPage = () => {
  const students: Student[] = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", course: "React Development", progress: 85, avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", course: "JavaScript Basics", progress: 92, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Carol Davis", email: "carol@example.com", course: "Node.js Backend", progress: 78, avatar: "https://randomuser.me/api/portraits/women/63.jpg" },
    { id: 4, name: "David Wilson", email: "david@example.com", course: "TypeScript", progress: 88, avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
    { id: 5, name: "Eve Martinez", email: "eve@example.com", course: "UI/UX Principles", progress: 65, avatar: "https://randomuser.me/api/portraits/women/25.jpg" },
    { id: 6, name: "Frank Taylor", email: "frank@example.com", course: "GraphQL", progress: 95, avatar: "https://randomuser.me/api/portraits/men/45.jpg" }
  ];

  return (
    <main className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          {/* <div>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <p className="mt-1 text-sm text-gray-600">Manage student information and progress</p>
          </div> */}
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Student
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            Filter <ChevronDown className="ml-1 w-4 h-4" />
          </button>
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{student.course}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{student.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};