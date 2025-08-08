import React from 'react';

interface ToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ show, message, type, onClose }) => {
  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-500 ease-in-out ${
      show ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
    }`}>
      {show && (
        <div className={`p-4 rounded-xl shadow-2xl border-l-4 backdrop-blur-sm max-w-sm ${
          type === 'success' 
            ? 'bg-emerald-50/90 border-emerald-400 text-emerald-800' 
            : 'bg-red-50/90 border-red-400 text-red-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center ${
                type === 'success' ? 'bg-emerald-100' : 'bg-red-100'
              }`}>
                {type === 'success' ? (
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium">{message}</span>
            </div>
            <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};