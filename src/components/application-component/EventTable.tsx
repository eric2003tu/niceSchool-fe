"use client";
import { Event } from "@/components/hooks/useEvents";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface EventTableProps {
  events: Event[];
  loading: boolean;
  onView: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

export const EventTable = ({ events, loading, onView, onEdit, onDelete }: EventTableProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div>
                    <p>{event.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {event.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {new Date(event.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Badge variant={event.isPublished ? "default" : "secondary"}>
                    {event.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                  <Badge variant={event.isRegistrationOpen ? "default" : "secondary"}>
                    {event.isRegistrationOpen ? 'Open' : 'Closed'}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onView(event)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(event)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(event)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};