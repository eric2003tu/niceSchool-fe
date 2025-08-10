import React from 'react';
import { ToastState } from '../hooks/UseToast';

export const Toast: React.FC<{ toast: ToastState; onClose: () => void }> = ({ toast, onClose }) => {
  if (!toast.isVisible) return null;

  const bgColor = toast.type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = toast.type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = toast.type === 'success' ? 'text-green-800' : 'text-red-800';

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
      <div className={`p-4 rounded-lg border-l-4 shadow-lg ${bgColor} ${borderColor}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`text-sm font-medium ${textColor}`}>{toast.title}</h3>
            <p className={`mt-1 text-sm ${textColor}`}>{toast.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};