// NavigationButtons.tsx
import React, { FormEvent } from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLastStep: boolean;
  className?: string;
  disabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSubmit,
  isLastStep,
  className = "",
  disabled = false
}) => {

  return (
    <div className={`flex justify-between pt-8 border-t border-gray-200 ${className}`}>
      {currentStep > 1 && (
        <button
          type="button"
          onClick={onPrev}
          disabled={false}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          ← Previous
        </button>
      )}

      {!isLastStep ? (
        <button
          type="button"
          onClick={onNext}
          disabled={false}
          className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
        >
          Next Step →
        </button>
      ) : (
        <button
          type="submit"
          disabled={false}
          className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
        >
          🎓 Submit Application
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;