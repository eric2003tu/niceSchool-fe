"use client";
import { Clock, MapPin, ArrowRight, CalendarPlus, Users, DollarSign } from "lucide-react";
import { ModernButton } from "./ModernButton";

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  category: string;
  isPublished: boolean;
  isRegistrationOpen: boolean;
  maxAttendees: number;
  price: string;
  registrations?: any[];
}

interface ModernEventCardProps {
  event: Event;
  onAddToCalendar: (event: Event) => void;
}

export const ModernEventCard = ({ event, onAddToCalendar }: ModernEventCardProps) => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  const formatTime = (date: Date) => 
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      academic: "from-blue-500 to-blue-600",
      workshop: "from-purple-500 to-purple-600", 
      conference: "from-indigo-500 to-indigo-600",
      social: "from-pink-500 to-pink-600",
      general: "from-gray-500 to-gray-600"
    };
    return colors[category.toLowerCase()] || "from-green-500 to-green-600";
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] border border-white/20">
      <div className="flex">
        {/* Date Block */}
        <div className={`bg-gradient-to-br ${getCategoryColor(event.category)} text-white px-6 py-8 flex flex-col items-center justify-center w-28 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center">
            <div className="text-3xl font-bold">{startDate.getDate()}</div>
            <div className="text-sm font-medium uppercase tracking-wider">
              {startDate.toLocaleDateString('en-US', { month: 'short' })}
            </div>
            <div className="text-xs opacity-90">{startDate.getFullYear()}</div>
          </div>
          {event.isRegistrationOpen && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 relative">
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${getCategoryColor(event.category)} text-white shadow-lg`}>
              {event.category.toUpperCase()}
            </span>
          </div>

          <div className="pr-20">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
              {event.title}
            </h3>
            
            {/* Event Meta */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600 gap-3">
                <Clock size={18} className="text-green-600 flex-shrink-0" />
                <span className="font-medium">
                  {formatTime(startDate)} - {formatTime(endDate)}
                </span>
              </div>
              <div className="flex items-center text-gray-600 gap-3">
                <MapPin size={18} className="text-green-600 flex-shrink-0" />
                <span className="font-medium truncate">{event.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 gap-3">
                  <Users size={18} className="text-green-600" />
                  <span className="font-medium text-sm">
                    {event.registrations?.length || 0}/{event.maxAttendees}
                  </span>
                </div>
                <div className="flex items-center text-green-700 gap-2">
                  <DollarSign size={18} />
                  <span className="font-bold">
                    {event.price === '0' ? 'Free' : `$${event.price}`}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
              {event.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <ModernButton variant="ghost" size="sm" className="flex items-center gap-2">
                Learn More <ArrowRight size={14} />
              </ModernButton>
              <ModernButton 
                variant="outline" 
                size="sm" 
                onClick={() => onAddToCalendar(event)}
                className="flex items-center gap-2"
              >
                <CalendarPlus size={14} /> Add to Calendar
              </ModernButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};