"use client";
import { useState, useEffect } from "react";
import { EventTable } from "./EventTable";
import { EventFilters } from "./EventFilters";
import { PaginationControls } from "./PaginationControls";
import { EventForm } from "./EventForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/hooks/UseToast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  category: string;
  isRegistrationOpen: boolean;
  maxAttendees: number;
  price: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  registrations: any[];
}

export const Events = () => {
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventsData, setEventsData] = useState<{events: Event[], total: number}>({
    events: [],
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          page: page.toString(),
          limit: '10',
          ...(searchTerm && { search: searchTerm }),
          ...(categoryFilter !== 'all' && { category: categoryFilter }),
          ...(statusFilter !== 'all' && { status: statusFilter })
        });

        const response = await fetch(
          `https://niceschool-be-2.onrender.com/api/events?${query}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEventsData({
          events: data.data || [],
          total: data.total || 0
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        showToast('Failed to load events', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page, searchTerm, categoryFilter, statusFilter]);

  const handleCreate = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (formData: Partial<Event>) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      showToast('Authentication required.', 'error');
      return;
    }

    try {
      const url = selectedEvent 
        ? `https://niceschool-be-2.onrender.com/api/events/${selectedEvent.id}`
        : 'https://niceschool-be-2.onrender.com/api/events';
      
      const method = selectedEvent ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(selectedEvent ? 'Failed to update event' : 'Failed to create event');
      }
      
      showToast(selectedEvent ? 'Event updated successfully.' : 'Event created successfully.', 'success');
      setIsFormOpen(false);
      setPage(1);
    } catch (error) {
      showToast('An error occurred.', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedEvent) return;
    const token = localStorage.getItem("authToken");
    if (!token) {
      showToast('Authentication required.', 'error');
      return;
    }

    try {
      const response = await fetch(`https://niceschool-be-2.onrender.com/api/events/${selectedEvent.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      showToast('Event deleted successfully.', 'success');
      setIsDeleteDialogOpen(false);
      setPage(1);
    } catch (error) {
      showToast('An error occurred.', 'error');
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center sticky">
        <h1 className="text-2xl font-bold">Events Dashboard</h1>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <EventFilters
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
      />

      <EventTable
        events={eventsData.events}
        loading={loading}
        onView={(event) => console.log('View:', event.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {eventsData.total > 0 && (
        <PaginationControls
          currentPage={page}
          totalPages={Math.ceil(eventsData.total / 10)}
          totalItems={eventsData.total}
          itemsPerPage={10}
          onPageChange={setPage}
        />
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? 'Edit Event' : 'Create New Event'}
            </DialogTitle>
          </DialogHeader>
          <EventForm
            event={selectedEvent || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};