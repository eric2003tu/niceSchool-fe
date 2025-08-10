"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/dashboard/ui/card";
import { Users, Plus, Search, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { AddUserForm } from '@/components/dashboard/AddUsers'

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  dateOfBirth: string;
  profileImage: string;
  // You might want to add course and progress fields if they exist in your API
}
interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage?: string;
}

export const StudentsPage = () => {
   const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(Array.isArray(parsedUser) ? parsedUser[0] : parsedUser);
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
    }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error('Authentication required');
      }
      try {
        const response = await fetch('https://niceschool-be-2.onrender.com/api/users',{
          method: "GET",
          headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },

        });
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();


        console.log(data)
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading students...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative flex justify-between items-center mb-8">
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add User
          </Button>
          {showForm && (
        <AddUserForm 
          onClose={() => setShowForm(false)}
          onUserAdded={() => {
            console.log("New user added!");
            // Refresh your data here if needed
          }}
        />
      )}
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
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img
                      src={student.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s"}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{student.firstName} {student.lastName}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{student.phone}</p>
                    <p className={`${ user?.email === student.email ? 'bg-green-500 text-white px-3 p-2 font-semibold text-center rounded-full' :'text-gray-600'} text-sm`}>
                      {student.role}
                    </p>
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