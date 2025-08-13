"use client";

import { useEffect, useState } from "react";
import { User } from "./types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/hooks/UseToast";
import { UserRole } from "./enums/user-role.enum";

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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as UserRole }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Authentication required");

      const uploadResponse = await fetch("https://niceschool-be-2.onrender.com/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload image");

      const { url } = await uploadResponse.json();
      setFormData((prev) => ({ ...prev, profileImage: url }));
    } catch (error) {
    showToast(
      "Error",
      error instanceof Error ? error.message : "Failed to load profile",
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
      error instanceof Error ? error.message : "Failed to load profile",
      "error"
    );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-red-500">Failed to load user profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <Avatar className="h-24 w-24">
            <AvatarImage src={formData.profileImage || user.profileImage} />
            <AvatarFallback>
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Label htmlFor="profileImage" className="cursor-pointer text-white">
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                Change
              </Label>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="inline-block px-3 py-1 mt-2 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {user.role}
          </p>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                type="email"
                required
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={handleRoleChange}
                disabled={user.role !== UserRole.ADMIN}
              >
                <SelectTrigger>
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
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setFormData(user);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">First Name</Label>
              <p className="text-lg">{user.firstName}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Last Name</Label>
              <p className="text-lg">{user.lastName}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Email</Label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Phone</Label>
              <p className="text-lg">{user.phone || "Not provided"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Date of Birth</Label>
              <p className="text-lg">
                {user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "Not provided"}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Role</Label>
              <p className="text-lg">{user.role}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        </div>
      )}
    </div>
  );
};