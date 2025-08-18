"use client";

import { useEffect, useState } from "react";
import { User, Camera, Edit3, Save, X, Phone, Mail, Calendar, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/hooks/UseToast";

export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  FACULTY = "FACULTY",
  ALUMNI = "ALUMNI",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string;
  phone?: string;
  dateOfBirth?: string | Date;
  isActive: boolean;
  lastLogin?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) throw new Error("Authentication required");

        const response = await fetch("https://niceschool-be-2.onrender.com/api/users/profile", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setUser(data);
        setFormData(data);
      } catch (error) {
        showToast(
          "Error",
          error instanceof Error ? error.message : "Failed to load profile",
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication required");

      const uploadResponse = await fetch("https://niceschool-be-2.onrender.com/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: uploadFormData,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload image");

      const { url } = await uploadResponse.json();
      setFormData((prev) => ({ ...prev, profileImage: url }));
    } catch (error) {
      showToast(
        "Error",
        error instanceof Error ? error.message : "Failed to upload image",
        "error"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication required");

      const response = await fetch("https://niceschool-be-2.onrender.com/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      showToast(
        "Success",
        "Profile updated successfully",
        "success"
      );
    } catch (error) {
      showToast(
        "Error",
        error instanceof Error ? error.message : "Failed to update profile",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case UserRole.ADMIN: return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case UserRole.FACULTY: return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
      case UserRole.STUDENT: return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case UserRole.ALUMNI: return 'bg-gradient-to-r from-purple-500 to-violet-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-50/50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              <Skeleton className="absolute inset-0" />
            </div>
            <div className="px-8 py-8">
              <div className="flex items-center space-x-6 mb-8">
                <Skeleton className="w-32 h-32 rounded-full -mt-20 border-4 border-white shadow-xl" />
                <div className="space-y-3">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full bg-gray-50/50 flex items-center justify-center py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-red-200 p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-600 font-medium">Failed to load user profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50/50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden">
          {/* Header Background */}
          <div className="relative h-32 sm:h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
          </div>

          {/* Profile Content */}
          <div className="relative px-4 sm:px-6 lg:px-8 py-6">
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6 lg:mb-0">
                {/* Avatar */}
                <div className="relative -mt-16 sm:-mt-20 group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-xl">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={formData.profileImage || user.profileImage} />
                      <AvatarFallback className="text-xl sm:text-2xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {isEditing && (
                    <Label className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Camera className="w-8 h-8 text-white" />
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  )}
                </div>

                {/* User Info */}
                <div className="space-y-2 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                    {user.firstName} {user.lastName}
                  </h1>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm sm:text-base lg:text-lg">{user.email}</span>
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${getRoleBadgeColor(user.role)}`}>
                    <Shield className="w-4 h-4 mr-2" />
                    {user.role}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-center lg:justify-end space-x-3 w-full lg:w-auto">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(user);
                      }}
                      disabled={isSubmitting}
                      className="flex items-center px-4 py-2 border-2 rounded-xl font-semibold shadow-lg text-sm"
                    >
                      <X className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Cancel</span>
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-1 sm:mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="hidden sm:inline">Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Save Changes</span>
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg text-sm"
                  >
                    <Edit3 className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Edit Profile</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Profile Form/Display */}
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-3">
                    <Label className="block text-sm font-semibold text-slate-700">First Name</Label>
                    <Input
                      name="firstName"
                      value={formData.firstName || ""}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                      placeholder="Enter first name"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-3">
                    <Label className="block text-sm font-semibold text-slate-700">Last Name</Label>
                    <Input
                      name="lastName"
                      value={formData.lastName || ""}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                      placeholder="Enter last name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <Label className="block text-sm font-semibold text-slate-700">Email Address</Label>
                    <Input
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      type="email"
                      required
                      disabled
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-slate-500 text-base"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <Label className="block text-sm font-semibold text-slate-700">Phone Number</Label>
                    <Input
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-3">
                    <Label className="block text-sm font-semibold text-slate-700">Date of Birth</Label>
                    <Input
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-3">
                    <Label className="block text-sm font-semibold text-slate-700">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={handleRoleChange}
                      disabled={user.role !== UserRole.ADMIN}
                    >
                      <SelectTrigger className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-base">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(UserRole).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Display Fields */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <Label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">First Name</Label>
                  </div>
                  <p className="text-lg font-medium text-slate-900">{user.firstName}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <Label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Last Name</Label>
                  </div>
                  <p className="text-lg font-medium text-slate-900">{user.lastName}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <Label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Email Address</Label>
                  </div>
                  <p className="text-lg font-medium text-slate-900">{user.email}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <Label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Phone Number</Label>
                  </div>
                  <p className="text-lg font-medium text-slate-900">
                    {user.phone || "Not provided"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <Label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Date of Birth</Label>
                  </div>
                  <p className="text-lg font-medium text-slate-900">
                    {user.dateOfBirth
                      ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : "Not provided"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <Label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Role</Label>
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-base font-semibold ${getRoleBadgeColor(user.role)}`}>
                    <Check className="w-4 h-4 mr-2" />
                    {user.role}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};