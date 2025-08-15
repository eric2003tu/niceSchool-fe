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
            <TableHead className="min-w-[300px]">Event</TableHead>
            <TableHead className="min-w-[120px]">Date</TableHead>
            <TableHead className="min-w-[140px]">Status</TableHead>
            <TableHead className="text-right min-w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium whitespace-normal max-w-[300px]">
                <div className="flex items-center gap-3">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-10 w-10 rounded-md object-cover flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMkMyMS4xIDIyIDIyIDIxLjEgMjIgMjBDMjIgMTguOSAyMS4xIDE4IDIwIDE4QzE4LjkgMTggMTggMTguOSAxOCAyMEMxOCAyMS4xIDE4LjkgMjIgMjAgMjJaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yOCAyOEgyOEwyMCAyMEwxNiAyNEgxMlYzMkgyOFYyOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm leading-tight">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {new Date(event.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex flex-col gap-1">
                  <Badge variant={event.isPublished ? "default" : "secondary"} className="text-xs">
                    {event.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                  <Badge variant={event.isRegistrationOpen ? "default" : "secondary"} className="text-xs">
                    {event.isRegistrationOpen ? 'Open' : 'Closed'}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                <div className="flex justify-end gap-1">
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