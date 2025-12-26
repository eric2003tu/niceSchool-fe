import axios from 'axios';

// Determine backend URL based on frontend environment
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost'
      ?   'http://localhost:3001/api'           // Local backend
      :   'https://niceschool-be-1.onrender.com/api'; // Render backend
  }
  return 'http://localhost:3001/api'; // Default for SSR
};

// Axios instance
const api = axios.create({
  baseURL: getBaseURL(),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken') || localStorage.getItem('access_token');
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Basic error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Extract array from API response
export function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.users)) return payload.users;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  return [];
}

// Test API connection
export const testAPIConnection = async () => {
  try {
    const res = await api.get('/health', { timeout: 10000 });
    return { success: true, data: res.data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export default api;
