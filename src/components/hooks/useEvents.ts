import { useState, useEffect } from "react";

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  category: string;
  isRegistrationOpen: boolean;
  maxAttendees: number;
  price: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  registrations: any[];
}

interface ApiResponse {
  data: Event[];
  total: number;
  page: number;
  limit: number;
}

export const useEvents = (params: {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  status?: string;
}) => {
  const [data, setData] = useState<ApiResponse>({ 
    data: [], 
    total: 0, 
    page: 1, 
    limit: 10 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const qs = new URLSearchParams({ page: String(params.page), limit: String(params.limit) });
        if (params.search) qs.set('search', params.search);
        if (params.category && params.category !== 'all') qs.set('category', params.category);
        if (params.status && params.status !== 'all') qs.set('status', params.status);
        const res = await (await import('@/lib/api')).default.get(`/events?${qs.toString()}`);
        const json: ApiResponse = res?.data?.data ? res.data : res.data;
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [params]);

  return { 
    events: data.data, 
    total: data.total, 
    page: data.page, 
    limit: data.limit, 
    loading, 
    error 
  };
};