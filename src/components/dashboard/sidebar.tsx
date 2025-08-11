"use client";

import { Home, BookOpen, Users, Calendar, BarChart3, Settings, X, LogOut, User, ChevronDown } from "lucide-react";
import { TiNews } from "react-icons/ti";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  storageUsed?: number; // Add storage prop
  storageLimit?: number; // Add storage prop
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage?: string;
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "#" },
  { icon: BookOpen, label: "Courses", href: "#" },
  { icon: Users, label: "Students", href: "#" },
  { icon: Calendar, label: "Schedule", href: "#" },
  { icon: BarChart3, label: "Analytics", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
  { icon: TiNews, label: "News", href: "#" },
  {icon: TiNews, label: "Profile", href: "#"},
  {icon: TiNews, label: "Apply", href: "#"}
];

export const Sidebar = ({ 
  isOpen, 
  setIsOpen,
  activeView,
  setActiveView,
  onLogout = () => console.log("Logout clicked"),
  onProfileClick = () => console.log("Profile clicked"),
  storageUsed = 2.4,
  storageLimit = 10
}: SidebarProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
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

  return (
    <>
      {/* Mobile overlay with higher z-index */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-100 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo Section */}
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
        
        {/* Navigation */}
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
                  setIsOpen(false);
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

        {/* User Profile Section */}
        <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
          <div className="p-4">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/80 transition-all duration-200 group"
                aria-expanded={showUserMenu}
                aria-label="User menu"
              >
                <div className="relative">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s"}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex flex-col text-left min-w-0">
                  {user ? (
                    <>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {`${user.firstName} ${user.lastName}`}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-emerald-600 font-medium">
                        {user.role}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Loading user...</p>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  showUserMenu ? 'rotate-180' : ''
                }`} />
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
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

          {/* Storage Info */}

        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};