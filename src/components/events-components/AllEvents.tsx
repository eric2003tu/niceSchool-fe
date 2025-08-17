"use client";
import { useState, useEffect } from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import { ModernButton } from "./ModernButton";
import { ModernInput } from "./ModernInput";
import { ModernSelect } from "./ModernSelect";
import { EventSkeleton } from "./EventSkeleton";
import { ModernEventCard } from "./ModernEventCard";
import { FeaturedEventCard } from "./FeaturedEventCard";
import { Event } from "./ModernEventCard";

const EVENTS_PER_PAGE = 6;

export const AllEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          page: currentPage.toString(),
          limit: EVENTS_PER_PAGE.toString(),
          ...(searchTerm && { search: searchTerm }),
          ...(categoryFilter && { category: categoryFilter }),
          isPublished: "true"
        });

        const response = await fetch(`https://niceschool-be-2.onrender.com/api/events/public?${query}`);
        const data = await response.json();
        
        setEvents(data.data || []);
        setFeaturedEvent(data.featured || data.data?.[0] || null);
        setTotalPages(Math.ceil((data.total || 0) / EVENTS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchEvents, 300);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, searchTerm, categoryFilter]);

  const addToCalendar = (event: Event) => {
    const startDate = new Date(event.startDate).toISOString().replace(/[-:]/g, '').split('.')[0];
    const endDate = new Date(event.endDate).toISOString().replace(/[-:]/g, '').split('.')[0];

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, "_blank");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    { value: "academic", label: "Academic", count: events.filter(e => e.category === "academic").length },
    { value: "workshop", label: "Workshop", count: events.filter(e => e.category === "workshop").length },
    { value: "conference", label: "Conference", count: events.filter(e => e.category === "conference").length },
    { value: "social", label: "Social", count: events.filter(e => e.category === "social").length }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our vibrant community and explore workshops, conferences, and networking opportunities 
            that will inspire and connect you with like-minded individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-12">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Enhanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernInput
                placeholder="Search events by name or description..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                icon={Search}
              />
              <ModernSelect
                value={categoryFilter}
                onChange={(value) => {
                  setCategoryFilter(value);
                  setCurrentPage(1);
                }}
                options={categories}
                placeholder="Filter by category"
              />
            </div>

            {/* Events List */}
            <div className="space-y-6">
              {loading ? (
                Array.from({ length: EVENTS_PER_PAGE }).map((_, i) => (
                  <EventSkeleton key={i} />
                ))
              ) : events.length > 0 ? (
                events.map((event) => (
                  <ModernEventCard 
                    key={event.id}
                    event={event}
                    onAddToCalendar={addToCalendar}
                  />
                ))
              ) : (
                <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="text-6xl mb-4 opacity-50">🎪</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">No Events Found</h3>
                  <p className="text-gray-500 text-lg">Try adjusting your search or check back later!</p>
                </div>
              )}
            </div>

            {/* Modern Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                {currentPage > 1 && (
                  <ModernButton
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </ModernButton>
                )}
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <ModernButton
                      key={page}
                      variant={currentPage === page ? "primary" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-12"
                    >
                      {page}
                    </ModernButton>
                  ))}
                </div>

                {currentPage < totalPages && (
                  <ModernButton
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </ModernButton>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            {/* Featured Event */}
            {featuredEvent && (
              <FeaturedEventCard event={featuredEvent} />
            )}

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Filter className="text-green-600" size={20} />
                Event Categories
              </h4>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div 
                    key={category.value}
                    onClick={() => {
                      setCategoryFilter(categoryFilter === category.value ? "" : category.value);
                      setCurrentPage(1);
                    }}
                    className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      categoryFilter === category.value 
                        ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 shadow-md' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{category.label}</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      categoryFilter === category.value
                        ? 'bg-green-200 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-6 text-white text-center shadow-2xl">
              <h4 className="text-xl font-bold mb-3">Host Your Event</h4>
              <p className="text-sm opacity-90 mb-4">
                Share your knowledge and connect with our community by hosting your own event.
              </p>
              <ModernButton variant="secondary" className="w-full">
                Get Started
              </ModernButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};