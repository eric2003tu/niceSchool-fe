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
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication required");
        return;
      }

      try {
        setLoading(true);
        let url = `https://niceschool-be-2.onrender.com/api/events?page=${params.page}&limit=${params.limit}`;
        
        if (params.search) url += `&search=${encodeURIComponent(params.search)}`;
        if (params.category && params.category !== 'all') url += `&category=${params.category}`;
        if (params.status && params.status !== 'all') url += `&status=${params.status}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json: ApiResponse = await response.json();
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