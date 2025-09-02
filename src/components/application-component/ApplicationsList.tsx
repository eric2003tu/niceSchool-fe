"use client";

import React, { useEffect, useState } from 'react';
import api, { extractList } from '@/lib/api';
import ApplicationDetailModal from './ApplicationDetailModal';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';

export default function ApplicationsList({ filter }: { filter?: any }) {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const params: any = { page, limit };
        if (filter?.program) params.program = filter.program;
        if (filter?.department) params.department = filter.department;
        if (filter?.course) params.course = filter.course;
        const res = await api.get('/admissions/applications', { params }).catch(() => ({ data: { data: [], total: 0 } }));
        if (!mounted) return;
        const payload = res.data?.data ?? res.data ?? [];
        setApps(payload);
        setTotal(res.data?.total ?? 0);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [page, JSON.stringify(filter || {})]);

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin"/></div>;
  if (apps.length === 0) return <div className="p-6 text-center text-gray-500">No applications found.</div>;

  return (
    <div className="space-y-4">
      {apps.map((app: any) => (
        <div key={app.id} className="border rounded p-4 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{app.program?.name || app.programId || 'Program'}</div>
              <div className="text-sm text-gray-500">{app.academicYear} • Applicant: {app.applicant?.email || app.applicantId}</div>
            </div>
            <div className="text-sm text-gray-500">{new Date(app.createdAt).toLocaleString()}</div>
          </div>
          <div className="mt-3">
            <button className="text-sm text-emerald-600" onClick={() => setSelectedApp(app)}>{'View details'}</button>
          </div>
        </div>
      ))}

      {selectedApp && (
        <ApplicationDetailModal application={selectedApp} onClose={() => setSelectedApp(null)} onStatusChange={(newStatus) => {
          // optimistic update: refresh list after status change
          setSelectedApp(null);
          setApps(prev => prev.map(a => a.id === selectedApp.id ? { ...a, status: newStatus } : a));
        }} />
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">Showing {apps.length} of {total}</div>
        <div className="space-x-2">
          <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-1 bg-gray-100 rounded">Prev</button>
          <button disabled={page*limit >= total} onClick={() => setPage(p => p+1)} className="px-3 py-1 bg-gray-100 rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
