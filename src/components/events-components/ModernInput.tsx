"use client";
import { ComponentType } from "react";

interface ModernInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
}

export const ModernInput = ({ 
  placeholder, 
  value, 
  onChange, 
  icon: Icon,
  className = ""
}: ModernInputProps) => (
  <div className={`relative ${className}`}>
    {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />}
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md`}
    />
  </div>
);