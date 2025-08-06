"use client";

import React, { CSSProperties } from "react";
import { Check, LucideIcon } from "lucide-react";

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  isStepComplete: (stepId: number) => boolean;
  className?: string;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ 
  steps, 
  currentStep, 
  isStepComplete,
  className = ""
}) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id || isStepComplete(step.id);
        
        return (
          <div key={step.id} className="flex flex-col items-center flex-1 relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
              isCompleted 
                ? 'bg-green-500 text-white' 
                : isActive 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {isCompleted ? <Check size={20} /> : <Icon size={20} />}
            </div>
            <div className="text-center">
              <div className={`font-medium text-sm ${
                isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.title}
              </div>
              <div className="text-xs text-gray-400 hidden sm:block">{step.description}</div>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`h-1 w-full mt-4 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                } hidden lg:block absolute`} 
                style={{
                  top: '24px',
                  left: `${(index + 1) * (100 / steps.length)}%`,
                  width: `${100 / steps.length}%`,
                  zIndex: -1
                } as CSSProperties}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStepper;