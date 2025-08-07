"use client";

import { Home, BookOpen, Users, Calendar, BarChart3, Settings, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Courses", active: false },
  { icon: Users, label: "Students", active: false },
  { icon: Calendar, label: "Schedule", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false }
];

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => (
  <>
    {/* Mobile overlay */}
    {isOpen && (
      <div 
        className="fixed inset-0 bg-gray-600/56 bg-opacity-50 transition-opacity lg:hidden z-20"
        onClick={() => setIsOpen(false)}
      />
    )}
    
    {/* Sidebar */}
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">NiceSchool</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="mt-8 px-4 space-y-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                item.active
                  ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  </>
);