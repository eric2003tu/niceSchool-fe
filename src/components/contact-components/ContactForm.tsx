'use client';
import React, { useState } from 'react';
import api from '@/lib/api';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";

type FormData = {
  firstName: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormData, string>>;
type ToastType = 'success' | 'error' | 'warning';
type ToastState = { type: ToastType; message: string } | null;

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const validateField = (name: keyof FormData, value: string): string => {
    const rules = {
      firstName: {
        required: value.trim() === '' && 'First name is required',
        minLength: value.length < 2 && 'First name must be at least 2 characters',
        pattern: !/^[a-zA-Z\s]+$/.test(value) && 'First name can only contain letters and spaces'
      },
      email: {
        required: value.trim() === '' && 'Email is required',
        pattern: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && 'Please enter a valid email address'
      },
      subject: {
        required: value.trim() === '' && 'Subject is required',
        minLength: value.length < 5 && 'Subject must be at least 5 characters'
      },
      message: {
        required: value.trim() === '' && 'Message is required',
        minLength: value.length < 10 && 'Message must be at least 10 characters',
        maxLength: value.length > 500 && 'Message must be less than 500 characters'
      }
    };

    return Object.values(rules[name]).find(error => error) || '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name as keyof FormData, value) }));
  };

  const validateForm = (): boolean => {
    const newErrors = Object.fromEntries(
      Object.keys(formData).map(field => [
        field, 
        validateField(field as keyof FormData, formData[field as keyof FormData])
      ])
    ) as Errors;
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return showToast('error', 'Please fix the errors below');

    setIsSubmitting(true);
    
    try {
      const response = await api.post('/contact', formData);

      if (response.status === 200) {
        showToast('success', 'Message sent successfully! We\'ll get back to you soon.');
        setFormData({ firstName: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        throw new Error(response.data?.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to send message. Please try again.';
      showToast('error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const Toast = ({ type, message, onClose }: { 
    type: ToastType; 
    message: string; 
    onClose: () => void 
  }) => {
    const config = {
      success: { icon: CheckCircle, color: 'bg-green-50 border-green-200 text-green-800' },
      error: { icon: XCircle, color: 'bg-red-50 border-red-200 text-red-800' },
      warning: { icon: AlertCircle, color: 'bg-yellow-50 border-yellow-200 text-yellow-800' }
    };
    
    const { icon: Icon, color } = config[type];
    
    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg max-w-sm ${color} animate-in slide-in-from-right-2 fade-in-75`}>
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">{message}</p>
          <button 
            onClick={onClose} 
            className="ml-auto text-lg leading-none hover:opacity-70"
            aria-label="Close toast"
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Get in Touch</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['firstName', 'email'].map(field => (
            <div key={field} className="space-y-1">
              <Input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={field === 'email' ? 'Email Address' : 'First Name'}
                value={formData[field as keyof FormData]}
                onChange={handleInputChange}
                className={`focus:ring-2 focus:ring-emerald-500 ${errors[field as keyof FormData] ? 'border-red-500' : ''}`}
              />
              {errors[field as keyof FormData] && (
                <p className="text-red-500 text-xs flex items-center gap-1 animate-in fade-in">
                  <XCircle className="h-3 w-3" />
                  {errors[field as keyof FormData]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <Input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`focus:ring-2 focus:ring-emerald-500 ${errors.subject ? 'border-red-500' : ''}`}
          />
          {errors.subject && (
            <p className="text-red-500 text-xs flex items-center gap-1 animate-in fade-in">
              <XCircle className="h-3 w-3" />
              {errors.subject}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className={`focus:ring-2 focus:ring-emerald-500 resize-none ${errors.message ? 'border-red-500' : ''}`}
          />
          <div className="flex justify-between items-center">
            {errors.message ? (
              <p className="text-red-500 text-xs flex items-center gap-1 animate-in fade-in">
                <XCircle className="h-3 w-3" />
                {errors.message}
              </p>
            ) : <div />}
            <span className={`text-xs ${formData.message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
              {formData.message.length}/500
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : 'Send Message'}
        </Button>
      </form>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ContactForm;