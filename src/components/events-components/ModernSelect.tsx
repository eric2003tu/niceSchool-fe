"use client";

interface ModernSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; count?: number }[];
  placeholder: string;
  className?: string;
}

export const ModernSelect = ({ 
  value, 
  onChange, 
  options,
  placeholder,
  className = ""
}: ModernSelectProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-700 shadow-sm hover:shadow-md ${className}`}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label} {option.count !== undefined && `(${option.count})`}
      </option>
    ))}
  </select>
);