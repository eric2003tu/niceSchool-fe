"use client";
import { ReactNode } from "react";

interface ModernButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const ModernButton = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  onClick, 
  disabled = false,
  className = ""
}: ModernButtonProps) => {
  const baseStyles = "font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50";
  
  const variants = {
    primary: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-green-600 text-green-700 hover:bg-green-50 hover:border-green-700",
    ghost: "text-green-700 hover:bg-green-50"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};