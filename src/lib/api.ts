import axios from 'axios';

// Determine the correct base URL
const getBaseURL = () => {
  // 1. Use environment variable if set
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // 2. In browser environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Production frontend (Vercel) - always use the Render backend
    if (hostname.includes('vercel.app') || hostname.includes('nice-school-fe')) {
      return 'https://niceschool-be-2.onrender.com/api';
    }
    
    // Local development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001/api';
    }
    
    // Any other production domain
    return 'https://niceschool-be-2.onrender.com/api';
  }

  // 3. Server-side rendering or default fallback
  return 'https://niceschool-be-2.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: { 
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS with credentials
});

// Request interceptor
api.interceptors.request.use((config) => {
  // Debug: log API calls in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🌐 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.baseURL + (config.url || ''),
      baseURL: config.baseURL,
      data: config.data,
    });
  }

  // Add Authorization token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken') || 
                  localStorage.getItem('access_token') || 
                  localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    // Enhanced error logging
    console.error('❌ API Error:', {
      message: error.message,
      url: error.config?.baseURL + error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    });

    // Handle CORS errors specifically
    if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
      console.error('🔗 CORS/Network Issue Detected');
      console.error('Frontend URL:', typeof window !== 'undefined' ? window.location.origin : 'Server-side');
      console.error('Backend URL:', error.config?.baseURL);
      
      // Provide helpful error message
      if (typeof window !== 'undefined') {
        error.corsHelp = `CORS error: Frontend (${window.location.origin}) cannot access backend (${error.config?.baseURL}). Check backend CORS configuration.`;
      }
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      console.warn('🔑 Unauthorized - Token might be expired or invalid');
      // Optional: Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('access_token');
        localStorage.removeItem('token');
        // You might want to redirect here:
        // window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Helper function to extract lists from API responses
export function extractList(payload: any): any[] {
  if (!payload) return [];
  
  // Direct array
  if (Array.isArray(payload)) return payload;

  // Helper: recursively search for the first array in an object
  const findArray = (value: any, seen = new Set()): any[] | null => {
    if (value == null) return null;
    if (Array.isArray(value)) return value;
    if (typeof value !== 'object') return null;
    if (seen.has(value)) return null;
    
    seen.add(value);
    
    for (const key of Object.keys(value)) {
      try {
        const found = findArray(value[key], seen);
        if (Array.isArray(found) && found.length > 0) return found;
      } catch (e) {
        // ignore and continue
      }
    }
    return null;
  };

  // Common top-level properties
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.users)) return payload.users;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;

  // Recursive search
  const nested = findArray(payload);
  return Array.isArray(nested) ? nested : [];
}

// Utility function to test API connection
export const testAPIConnection = async () => {
  try {
    console.log('🔍 Testing API connection to:', api.defaults.baseURL);
    
    const response = await api.get('/health', { 
      timeout: 10000,
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    console.log('✅ API Connection Test Successful:', {
      status: response.status,
      data: response.data,
      baseURL: api.defaults.baseURL,
    });
    
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('❌ API Connection Test Failed:', {
      message: error.message,
      baseURL: api.defaults.baseURL,
      suggestion: 'Check if backend is running and CORS is properly configured',
    });
    
    return { 
      success: false, 
      error: error.message,
      baseURL: api.defaults.baseURL,
    };
  }
};

export default api;