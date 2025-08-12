"use client";

import { CoursesPage } from "@/components/dashboard/courses";
import { StudentsPage } from "@/components/dashboard/students";
import { SchedulePage } from "@/components/dashboard/schedule";
import { AnalyticsPage } from "@/components/dashboard/analytics";
import { SettingsPage } from "@/components/dashboard/settings";
import DashboardPage from "@/components/dashboard/DashboardPage";
import AddNews from "@/components/dashboard/AddNews";
import ProNewsManagement from "@/components/dashboard/AddNews";
import { ProfilePage } from "@/components/dashboard/profile/ProfilePage";
import ModernAdmissionForm from '@/components/application-component/ModernAdmissionForm'
import MyApplications from "@/components/application-component/MyApplications";
import Admin from '@/components/application-component/Admin'

interface DashboardContentProps {
  activeView: string;
}

export default function DashboardContent({ activeView }: DashboardContentProps) {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 max-w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeView === 'dashboard' ? 'Dashboard' : 
             activeView === 'courses' ? 'Courses' :
             activeView === 'students' ? 'Students' :
             activeView === 'schedule' ? 'Schedule' :
             activeView === 'news' ? 'News':
             activeView === 'admin' ? 'Admin':
             activeView === 'apps' ? "Apps":
             activeView === 'apply' ? "Apply":
             activeView === 'profile' ? 'Profile':
             activeView === 'analytics' ? 'Analytics' : 'Settings'
             }
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {activeView === 'dashboard' ? 'Welcome back! Here\'s what\'s happening at NiceSchool today.' : 
             `Manage ${activeView} and related activities`}
          </p>
        </div>

        {/* Main content area */}
        {activeView === 'dashboard' && <DashboardPage />}
        {activeView === 'courses' && <CoursesPage />}
        {activeView === 'students' && <StudentsPage />}
        {activeView === 'schedule' && <SchedulePage />}
        {activeView === 'analytics' && <AnalyticsPage />}
        {activeView === 'settings' && <SettingsPage />}
        {activeView === 'news' && <ProNewsManagement />}
        {activeView === 'profile' && <ProfilePage/>}
        {activeView === 'apply' && <ModernAdmissionForm/>}
        {activeView === 'apps' && <MyApplications/>}
        {activeView === 'admin' && <Admin/>}
      </div>
    </main>
  );
}