"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/dashboard/ui/card";
import { User, Bell, Lock, CreditCard } from "lucide-react";
import { Button } from "./ui/button";

export const SettingsPage = () => {
  return (
    <main className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-gray-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-600" />
                <CardTitle>Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@niceschool.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <Button className="w-full">Update Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <CardTitle>Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Email notifications", enabled: true },
                  { label: "Push notifications", enabled: false },
                  { label: "SMS alerts", enabled: true },
                  { label: "Weekly summaries", enabled: true }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <input
                      type="checkbox"
                      defaultChecked={item.enabled}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <CardTitle>Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full flex items-center justify-between">
                  Change Password
                  <span className="text-xs text-gray-500">Last changed 3 months ago</span>
                </Button>
                <Button variant="outline" className="w-full">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full">
                  Login History
                </Button>
                <Button variant="outline" className="w-full">
                  Connected Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Section */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <CardTitle>Billing Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Premium Plan</p>
                    <p className="text-sm text-gray-600">$29/month</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Payment Methods</Button>
                  <Button variant="outline">Billing History</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};