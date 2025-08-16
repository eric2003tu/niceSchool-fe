"use client";
import { Sparkles } from "lucide-react";
import { ModernButton } from "./ModernButton";
import { Event } from "./ModernEventCard";

interface FeaturedEventCardProps {
  event: Event;
}

export const FeaturedEventCard = ({ event }: FeaturedEventCardProps) => (
  <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl overflow-hidden shadow-2xl text-white relative">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="absolute top-4 left-4">
      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
        <Sparkles size={16} className="text-yellow-300" />
        <span className="text-sm font-bold">Featured</span>
      </div>
    </div>
    
    {event.imageUrl && (
      <div className="h-48 relative overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt="Featured Event" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
    )}
    
    <div className="p-6 relative z-10">
      <h4 className="text-xl font-bold mb-2">{event.title}</h4>
      <p className="text-sm opacity-90 mb-1">
        {new Date(event.startDate).toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })}
      </p>
      <p className="text-sm opacity-80 mb-4 line-clamp-3">{event.description}</p>
      <ModernButton variant="secondary" className="w-full">
        Register Now
      </ModernButton>
    </div>
  </div>
);