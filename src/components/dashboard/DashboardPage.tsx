import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { CoursePerformance } from "@/components/dashboard/course-performance";
import { UpcomingEvents } from "@/components/dashboard/upcoming-events";

export default function DashboardPage() {
  return (
    <main className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        {/* <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back! Here's what's happening at NiceSchool today.
          </p>
        </div> */}

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value="2,847"
            change="+12% from last month"
            changeType="positive"
            icon="Users"
          />
          <StatsCard
            title="Active Courses"
            value="24"
            change="+3 new courses"
            changeType="positive"
            icon="BookOpen"
          />
          <StatsCard
            title="Completion Rate"
            value="89%"
            change="+5% improvement"
            changeType="positive"
            icon="Award"
          />
          <StatsCard
            title="Revenue"
            value="$12,847"
            change="+18% from last month"
            changeType="positive"
            icon="TrendingUp"
          />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Additional content row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <CoursePerformance />
          <UpcomingEvents />
        </div>
      </div>
    </main>
  );
}