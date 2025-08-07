"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/dashboard/ui/card";
import { Plus, Users, Calendar, BarChart3 } from "lucide-react";

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

export const QuickActions = () => {
  const actions: QuickAction[] = [
    { icon: Plus, label: "Add Course", color: "bg-blue-500" },
    { icon: Users, label: "Invite Student", color: "bg-emerald-500" },
    { icon: Calendar, label: "Schedule Class", color: "bg-purple-500" },
    { icon: BarChart3, label: "View Reports", color: "bg-orange-500" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Frequently used actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};