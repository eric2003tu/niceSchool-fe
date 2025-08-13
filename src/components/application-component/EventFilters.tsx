"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Ticket } from "lucide-react";

interface EventFiltersProps {
  searchTerm: string;
  categoryFilter: string;
  statusFilter: string;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

export const EventFilters = ({
  searchTerm,
  categoryFilter,
  statusFilter,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: EventFiltersProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
    
    <Select value={categoryFilter} onValueChange={onCategoryChange}>
      <SelectTrigger>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <SelectValue placeholder="Category" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="general">General</SelectItem>
        <SelectItem value="workshop">Workshop</SelectItem>
        <SelectItem value="conference">Conference</SelectItem>
      </SelectContent>
    </Select>
    
    <Select value={statusFilter} onValueChange={onStatusChange}>
      <SelectTrigger>
        <div className="flex items-center gap-2">
          <Ticket className="h-4 w-4 text-gray-500" />
          <SelectValue placeholder="Status" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="open">Registration Open</SelectItem>
        <SelectItem value="closed">Registration Closed</SelectItem>
      </SelectContent>
    </Select>
  </div>
);