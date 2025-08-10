"use client";
import React from 'react';
import { useForm } from '@/hooks/UseForm';
import { useToast } from '@/hooks/UseToast';
import { Toast } from '@/hooks/UseToast';
import { Input } from './ui/login/Input';
import { Button } from './ui/login/Button';
import { validateField } from '../utils/validation';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  const validateForm = (values: LoginFormData) => {
    const errors: Partial<Record<keyof LoginFormData, string>> = {};
    Object.keys(values).forEach(field => {
      const error = validateField(field, values[field as keyof LoginFormData]);
      if (error) errors[field as keyof LoginFormData] = error;
    });
    return errors;
  };

  const handleLogin = async (values: LoginFormData) => {
    try {
      const response = await fetch('https://niceschool-be-2.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 401) throw new Error('Invalid email or password. Please try again.');
        if (status === 429) throw new Error('Too many login attempts. Please try again later.');
        if (status === 500) throw new Error('Server error. Please try again later.');
        throw new Error('Login failed. Please check your credentials.');
      }
    const { access_token, user } = await response.json();
    
    // Store token and user data in localStorage
    localStorage.setItem('authToken', access_token);
    localStorage.setItem('user', JSON.stringify(user));
      showToast('Welcome back! Login successful.', 'success');
       router.push('/dashboard');
    } catch (error) {
      const message = error instanceof Error 
        ? (error.message.includes('Failed to fetch') 
          ? 'Network error. Please check your connection and try again.' 
          : error.message)
        : 'An unexpected error occurred. Please try again.';
      showToast(message, 'error');
      throw error;
    }
  };

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: validateForm,
    onSubmit: handleLogin
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-10">
      <Toast show={toast.show} message={toast.message} type={toast.type} onClose={hideToast} />
      
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
              <img src="apple-touch-icon.png" alt="logo" className="w-full h-full rounded-2xl"/>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to your NiceSchool account</p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.values.email}
              onChange={form.handleChange}
              label="Email Address"
              error={form.errors.email}
              icon={<svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>}
            />

            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.values.password}
              onChange={form.handleChange}
              label="Password"
              error={form.errors.password}
              showPasswordToggle
              icon={<svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white/70 hover:text-white cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-emerald-500 bg-white/10 border-white/20 rounded focus:ring-emerald-500 focus:ring-2"/>
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <Button type="submit" loading={form.isSubmitting}>
              {form.isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;