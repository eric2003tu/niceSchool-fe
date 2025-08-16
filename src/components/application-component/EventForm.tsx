"use client";
import { Event } from "@/components/hooks/useEvents";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface EventFormProps {
  event?: Partial<Event>;
  onSubmit: (data: Partial<Event>) => void;
  onCancel: () => void;
}

export const EventForm = ({ event, onSubmit, onCancel }: EventFormProps) => {
  const [formData, setFormData] = useState<Partial<Event>>(event || {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    imageUrl: "",
    category: "general",
    isRegistrationOpen: true,
    maxAttendees: 100,
    price: "0",
    isPublished: false
  });

  const formatDateForInput = (isoString: string): string => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const dataToSubmit: Partial<Event> = {
    ...formData,
  };

  // Only include startDate if it has a value
  if (formData.startDate) {
    dataToSubmit.startDate = new Date(formData.startDate).toISOString();
  } else {
    delete dataToSubmit.startDate;
  }

  if (formData.endDate) {
    dataToSubmit.endDate = new Date(formData.endDate).toISOString();
  } else {
    delete dataToSubmit.endDate;
  }

  onSubmit(dataToSubmit);
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full border rounded-md p-2 min-h-[100px]"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="datetime-local"
            value={formatDateForInput(formData.startDate as string)}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="datetime-local"
            value={formatDateForInput(formData.endDate as string)}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({...formData, category: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxAttendees">Max Attendees</Label>
          <Input
            id="maxAttendees"
            type="number"
            value={formData.maxAttendees}
            onChange={(e) => setFormData({...formData, maxAttendees: Number(e.target.value)})}
            min="1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            min="0"
            step="0.01"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="registration"
              checked={formData.isRegistrationOpen}
              onCheckedChange={(checked) => setFormData({...formData, isRegistrationOpen: checked})}
            />
            <Label htmlFor="registration">Registration Open</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.isPublished}
              onCheckedChange={(checked) => setFormData({...formData, isPublished: checked})}
            />
            <Label htmlFor="published">Published</Label>
          </div>
        </div>
        
        <div className="space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {event?.id ? 'Update' : 'Create'} Event
          </Button>
        </div>
      </div>
    </form>
  );
};