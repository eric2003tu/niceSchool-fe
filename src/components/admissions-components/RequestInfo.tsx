"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

// Note: In a real project, you would install zod with: npm install zod
// For this demo, I'll implement basic validation without the zod library
const validateField = (name: string, value: string): string | null => {
  switch (name) {
    case 'fullName':
      if (value.length < 2) return "Full name must be at least 2 characters";
      if (value.length > 50) return "Full name must be less than 50 characters";
      return null;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      return null;
    case 'phone':
      const phoneRegex = /^[\d\s\-\(\)\+]+$/;
      if (value.length < 10) return "Phone number must be at least 10 digits";
      if (!phoneRegex.test(value)) return "Please enter a valid phone number";
      return null;
    case 'program':
      if (!value) return "Please select a program";
      return null;
    default:
      return null;
  }
};

interface RequestFormData {
  fullName: string;
  email: string;
  phone: string;
  program: string;
  message: string;
}

interface ProgramOption {
  value: string;
  label: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

const programOptions: ProgramOption[] = [
  { value: "", label: "Program of Interest" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Business Administration", label: "Business Administration" },
  { value: "Engineering", label: "Engineering" }
];

const RequestInfo: React.FC = () => {
  const [form, setForm] = useState<RequestFormData>({
    fullName: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 5000);
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm(prevForm => ({ 
      ...prevForm, 
      [name as keyof RequestFormData]: value 
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof RequestFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RequestFormData, string>> = {};
    let isValid = true;

    (Object.keys(form) as Array<keyof RequestFormData>).forEach(field => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please correct the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://www.niceschool.com/request-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Reset form on success
      setForm({
        fullName: "",
        email: "",
        phone: "",
        program: "",
        message: "",
      });
      
      showToast('Thank you! Your request has been submitted successfully.', 'success');
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          showToast('Network error. Please check your connection and try again.', 'error');
        } else if (error.message.includes('400')) {
          showToast('Invalid form data. Please check your information.', 'error');
        } else if (error.message.includes('500')) {
          showToast('Server error. Please try again later.', 'error');
        } else {
          showToast('An unexpected error occurred. Please try again.', 'error');
        }
      } else {
        showToast('An unexpected error occurred. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 ${
          toast.type === 'success' 
            ? 'bg-green-50 border-green-400 text-green-800' 
            : 'bg-red-50 border-red-400 text-red-800'
        } max-w-md`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {toast.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
            <button
              onClick={hideToast}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Request Information
        </h2>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida
          nibh vel velit auctor aliquet.
        </p>
        
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all ${
                errors.program ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              {programOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.program && (
              <p className="text-red-500 text-sm mt-1">{errors.program}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Questions or Comments"
              value={form.message}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => handleSubmit(e as any)}
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#0F9255] hover:bg-green-700'
            } text-white`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestInfo;