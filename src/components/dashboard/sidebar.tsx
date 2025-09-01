"use client";

import { Home, BookOpen, Users, Calendar, BarChart3, Settings, X, LogOut, User, ChevronDown, ChevronRight, Contact } from "lucide-react";
import { HiAcademicCap } from "react-icons/hi2";
import { IoSchoolSharp } from "react-icons/io5";
import { FaDoorOpen } from "react-icons/fa";
import { TiNews } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface SidebarItem {
  icon: any;
  label: string;
  href: string;
  children?: SidebarItem[];
}


const sidebarItemsByRole: Record<string, SidebarItem[]> = {
  STUDENT: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: HiAcademicCap, label: "Academics", href: "#", 
  children: [
    { icon: IoSchoolSharp, label: "Departments", href: "/dashboard/academics/department"},
    { icon: HiAcademicCap, label: "Programs", href: "/dashboard/academics/programs" },
    { icon: BookOpen, label: "Courses", href: "/dashboard/academics/courses" },
    { icon: Calendar, label: "Cohorts", href: "/dashboard/academics/cohorts" },
    { icon: Users, label: "Enrollments", href: "/dashboard/academics/enrollments" },
    { icon: Calendar, label: "Attendance", href: "/dashboard/academics/attendance" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/schedules" }
  ]},
  { icon: TiNews, label: "News", href: "/dashboard/news" },
  { icon: CgProfile, label: "Profile", href: "/dashboard/profile" },
  { icon: IoSchoolSharp, label: "Applications", href: "#", children: [
    { icon: HiAcademicCap, label: "Apply", href: "/dashboard/applications/apply" },
    { icon: FaDoorOpen, label: "My Applications", href: "/dashboard/applications" },
    ] },
    {icon: Contact, label: "Contact", href:"/dashboard/contact"},
  ],
  ADMIN: [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: HiAcademicCap, label: "Academics", href: "#", 
  children: [
    { icon: IoSchoolSharp, label: "Departments", href: "/dashboard/academics/department" },
    { icon: HiAcademicCap, label: "Programs", href: "/dashboard/academics/programs" },
    { icon: BookOpen, label: "Courses", href: "/dashboard/academics/courses" },
    { icon: Calendar, label: "Cohorts", href: "/dashboard/academics/cohorts" },
    { icon: Users, label: "Enrollments", href: "/dashboard/academics/enrollments" },
    { icon: Calendar, label: "Attendance", href: "/dashboard/academics/attendance" }
  ]},
  { icon: HiAcademicCap, label: "Apply", href: "/dashboard/applications/apply" },
  { icon: FaDoorOpen, label: "My Applications", href: "/dashboard/applications" },
  { icon: Home, label: "All Applications", href: "/dashboard/all-applications" },
  { icon: IoSchoolSharp, label: "Events", href: "/dashboard/events" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: TiNews, label: "News", href: "#", children: [
      { icon: TiNews, label: "Browse News", href: "/dashboard/news" },
      { icon: TiNews, label: "Publish News", href: "/dashboard/news/create-news" }
    ] },
    { icon: CgProfile, label: "Profile", href: "/dashboard/profile" },
    {icon: Contact, label: "Contact", href:"/dashboard/contact"},
  ],
  FACULTY: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: HiAcademicCap, label: "Academics", href: "/dashboard/academics" },
  { icon: IoSchoolSharp, label: "Departments", href: "/dashboard/academics/department" },
  { icon: HiAcademicCap, label: "Programs", href: "/dashboard/academics/programs" },
  { icon: BookOpen, label: "Courses", href: "/dashboard/academics/courses" },
  { icon: Calendar, label: "Cohorts", href: "/dashboard/academics/cohorts" },
  { icon: Users, label: "Enrollments", href: "/dashboard/academics/enrollments" },
  { icon: Calendar, label: "Attendance", href: "/dashboard/academics/attendance" },
  { icon: IoSchoolSharp, label: "Events", href: "/dashboard/events" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/schedules" },
    { icon: TiNews, label: "News", href: "#", children: [
      { icon: TiNews, label: "Browse News", href: "/dashboard/news" },
      { icon: TiNews, label: "Publish News", href: "/dashboard/news/create-news" }
    ] },
    { icon: CgProfile, label: "Profile", href: "/dashboard/profile" },
    {icon: Contact, label: "Contact", href:"/dashboard/contact"},
  ],
  ALUMNI: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: HiAcademicCap, label: "Academics", href: "/dashboard/academics" },
  { icon: IoSchoolSharp, label: "Departments", href: "/dashboard/academics/department" },
  { icon: HiAcademicCap, label: "Programs", href: "/dashboard/academics/programs" },
  { icon: BookOpen, label: "Courses", href: "/dashboard/academics/courses" },
  { icon: Calendar, label: "Cohorts", href: "/dashboard/academics/cohorts" },
  { icon: Users, label: "Enrollments", href: "/dashboard/academics/enrollments" },
  { icon: Calendar, label: "Attendance", href: "/dashboard/academics/attendance" },
  { icon: IoSchoolSharp, label: "Events", href: "/dashboard/events" },
    { icon: IoSchoolSharp, label: "Alumni Events", href: "/dashboard/alumni-events" },
    { icon: TiNews, label: "News", href: "#", children: [
      { icon: TiNews, label: "Browse News", href: "/dashboard/news" },
      { icon: TiNews, label: "Publish News", href: "/dashboard/news/create-news" }
    ] },
    { icon: CgProfile, label: "Profile", href: "/dashboard/profile" },
    {icon: Contact, label: "Contact", href:"/dashboard/contact"},
  ],
};

export const Sidebar = ({ 
  isOpen, 
  setIsOpen,
  onLogout = () => console.log("Logout clicked"),
  onProfileClick = () => console.log("Profile clicked"),
}: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

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

    // Automatically expand parent items when child is active
    const sidebarItems = getSidebarItems();
    const activeParent = sidebarItems.find((item: SidebarItem) => 
      item.children?.some(child => pathname.startsWith(child.href)));
    if (activeParent) {
      setExpandedItems(prev => ({ ...prev, [activeParent.label]: true }));
    }
  }, [pathname]);

  const getSidebarItems = () => {
    const role = user?.role?.toUpperCase();
    return sidebarItemsByRole[typeof role === "string" ? role : "ADMIN"] || sidebarItemsByRole["STUDENT"];
  };

  const toggleItemExpansion = (label: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isActive = (href: string) => {
    if (href === "#") return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderSidebarItem = (item: SidebarItem, index: number, depth = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.label];
    const active = isActive(item.href);

    return (
      <div key={`${index}-${depth}`} className="space-y-1">
        <button
          onClick={() => {
            if (hasChildren) {
              toggleItemExpansion(item.label);
            } else if (item.href !== "#") {
              router.push(item.href);
              setIsOpen(false);
            }
          }}
          className={`group flex items-center w-full px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 relative ${
            active
              ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/80 text-emerald-700 shadow-sm border border-emerald-200/50'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-[1.02]'
          }`}
          style={{ paddingLeft: `${depth * 16 + 16}px` }}
        >
          <Icon className={`w-5 h-5 mr-4 transition-all duration-200 ${
            active 
              ? 'text-emerald-600' 
              : 'text-gray-400 group-hover:text-gray-600'
          }`} />
          <span className="font-semibold">{item.label}</span>
          
          {hasChildren && (
            <span className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </span>
          )}
          
          {active && !hasChildren && (
            <div className="absolute right-2 w-2 h-2 bg-emerald-500 rounded-full"></div>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {item.children?.map((child, childIndex) => 
              renderSidebarItem(child, childIndex, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

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
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-100 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Fixed Header */}
        <div className="flex-shrink-0">
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
        </div>
        
        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            {getSidebarItems().map((item: SidebarItem, index: number) => renderSidebarItem(item, index))}
          </nav>
        </div>

        {/* Fixed Footer */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user?.profileImage || '/person-m-3.webp'} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold">{user?.firstName} {user?.lastName}</div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setShowUserMenu(prev => !prev); }}
                aria-label="Open user menu"
                className="p-2 rounded-lg hover:bg-gray-50"
              >
                <User className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => onLogout()}
                aria-label="Logout"
                className="p-2 rounded-lg hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {showUserMenu && (
            <div className="mt-3 bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
              <button onClick={() => { onProfileClick(); setShowUserMenu(false); setIsOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Profile</button>
              <button onClick={() => { onLogout(); setShowUserMenu(false); setIsOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Logout</button>
            </div>
          )}
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