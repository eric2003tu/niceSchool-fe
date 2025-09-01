import axios from 'axios';

const DEFAULT_REMOTE = 'https://niceschool-be-2.onrender.com/api';
const ENV_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: ENV_BASE || DEFAULT_REMOTE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token from localStorage (authToken) to every request if present
api.interceptors.request.use((config) => {
  // If running in the browser and the user hasn't set NEXT_PUBLIC_API_BASE_URL,
  // prefer the local backend at port 3001 to avoid requests hitting the Next.js dev server.
  if (typeof window !== 'undefined' && !ENV_BASE) {
    try {
      const host = window.location.hostname;
      if (host === 'localhost' || host === '127.0.0.1') {
        // use local backend when developing
        // keep protocol in sync (http vs https)
        config.baseURL = `${window.location.protocol}//${host}:3001/api`;
      }
    } catch (e) {
      // ignore
    }
  }

  if (typeof window === 'undefined') return config;
  const token = localStorage.getItem('authToken') || localStorage.getItem('access_token') || localStorage.getItem('token');
  if (token && config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.users)) return payload.users;
  for (const key of Object.keys(payload)) {
    if (Array.isArray(payload[key])) return payload[key];
  }
  return [];
}

export default api;
