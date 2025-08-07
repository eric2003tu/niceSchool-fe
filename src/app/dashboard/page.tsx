"use client";

import { useState } from "react";
import { CoursesPage } from "@/components/dashboard/courses";
import { StudentsPage } from "@/components/dashboard/students";
import { SchedulePage } from "@/components/dashboard/schedule";
import { AnalyticsPage } from "@/components/dashboard/analytics";
import { SettingsPage } from "@/components/dashboard/settings";
import DashboardPage from "@/components/dashboard/DashboardPage";

type ActiveView = 
  | 'dashboard' 
  | 'courses' 
  | 'students' 
  | 'schedule' 
  | 'analytics' 
  | 'settings';

export default function page() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
            <DashboardPage/>
        );
      case 'courses':
        return <CoursesPage />;
      case 'students':
        return <StudentsPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeView === 'dashboard' ? 'Dashboard' : 
             activeView === 'courses' ? 'Courses' :
             activeView === 'students' ? 'Students' :
             activeView === 'schedule' ? 'Schedule' :
             activeView === 'analytics' ? 'Analytics' : 'Settings'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {activeView === 'dashboard' ? 'Welcome back! Here\'s what\'s happening at NiceSchool today.' : 
             `Manage ${activeView} and related activities`}
          </p>
        </div>

        {renderContent()}
      </div>
    </main>
  );
}