"use client";
import { useState } from "react";
import { useEvents, Event } from "@/components/hooks/useEvents"; // Import Event type
import { EventTable } from "@/components/application-component/EventTable";
import { EventFilters } from "@/components/application-component/EventFilters";
import { PaginationControls } from "@/components/application-component/PaginationControls";
import { EventForm } from "@/components/application-component/EventForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import {Dialog,DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { useToast } from "@/components/hooks/UseToast";
import { Toast } from '@/components/ui/Toast';

export const Events = () => {
  const { toast, showToast, hideToast } = useToast();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { events, total, loading, error } = useEvents({
    page,
    limit: 10,
    search: searchTerm,
    category: categoryFilter !== "all" ? categoryFilter : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

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
        ? `http://localhost:3001/api/events/${selectedEvent.id}`
        : 'http://localhost:3001/api/events';
      
      const method = selectedEvent ? 'PUT' : 'POST';
      
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
      const response = await fetch(`http://localhost:3001/api/events/${selectedEvent.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
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
      <div className="flex justify-between items-center">
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
        events={events}
        loading={loading}
        onView={(event) => console.log('View:', event.id)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PaginationControls
        currentPage={page}
        totalPages={Math.ceil(total / 10)}
        totalItems={total}
        itemsPerPage={10}
        onPageChange={setPage}
      />

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

      {/* {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )} */}
    </div>
  );
};