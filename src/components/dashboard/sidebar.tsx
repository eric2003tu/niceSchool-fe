"use client";

import { Home, BookOpen, Users, Calendar, BarChart3, Settings, X, LogOut, User, ChevronDown } from "lucide-react";
import { TiNews } from "react-icons/ti";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  onLogout?: () => void;
  onProfileClick?: () => void;
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "#" },
  { icon: BookOpen, label: "Courses", href: "#" },
  { icon: Users, label: "Students", href: "#" },
  { icon: Calendar, label: "Schedule", href: "#" },
  { icon: BarChart3, label: "Analytics", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
  {icon: TiNews, label: "News", href:"#"}
];

export const Sidebar = ({ 
  isOpen, 
  setIsOpen,
  activeView,
  setActiveView,
  user = {
    name: "John Doe",
    email: "john.doe@niceschool.com",
    role: "Administrator",
    avatar: "person-f-2.webp"
  },
  onLogout = () => console.log("Logout clicked"),
  onProfileClick = () => console.log("Profile clicked")
}: SidebarProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      {/* Modern Mobile overlay with blur effect */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar with modern styling */}
      <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-2xl transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-100 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo Section with enhanced styling */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                NiceSchool
              </span>
              <p className="text-xs text-gray-500 -mt-0.5">Learning Platform</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/50 transition-colors group"
          >
            <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>
        
        {/* Navigation with modern styling */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const viewKey = item.label.toLowerCase();
            const isActive = activeView === viewKey;
            
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveView(viewKey);
                  setIsOpen(false); // Close sidebar on mobile
                }}
                className={`group flex items-center w-full px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/80 text-emerald-700 shadow-sm border border-emerald-200/50'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-[1.02]'
                }`}
              >
                <Icon className={`w-5 h-5 mr-4 transition-all duration-200 ${
                  isActive 
                    ? 'text-emerald-600' 
                    : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                <span className="font-semibold">{item.label}</span>
                {isActive && (
                  <div className="absolute right-2 w-2 h-2 bg-emerald-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Section at Bottom */}
        <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
          <div className="p-4">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/80 transition-all duration-200 group"
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">
                    {user.role}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  showUserMenu ? 'rotate-180' : ''
                }`} />
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        onProfileClick();
                        setShowUserMenu(false);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                    >
                      <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-600" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-600" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats or Info */}
          <div className="px-4 pb-4">
            <div className="bg-white/60 rounded-lg p-3 border border-white/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Storage Used</span>
                <span className="text-gray-700 font-medium">2.4GB / 10GB</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1.5 rounded-full w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};