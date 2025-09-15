"use client";

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';

function StatCard({ title, value, subtitle }: { title: string; value: number | string; subtitle?: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  );
}

export default function ApplicationsAnalyticsRow({ filter }: { filter?: any }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        if (filter && (filter.program || filter.department || filter.course)) {
          // fetch filtered applications (quick counts via applications endpoint)
          const res = await api.get('/admissions/applications', { params: { page: 1, limit: 1, program: filter.program, department: filter.department, course: filter.course } });
          // backend returns { data, total }
          const total = res.data?.total ?? 0;
          // we can fetch status breakdown individually (cheap) if supported
          const [approvedRes, pendingRes, rejectedRes] = await Promise.all([
            api.get('/admissions/applications', { params: { page: 1, limit: 1, program: filter.program, department: filter.department, course: filter.course, status: 'APPROVED' } }).catch(() => ({ data: { total: 0 } })),
            api.get('/admissions/applications', { params: { page: 1, limit: 1, program: filter.program, department: filter.department, course: filter.course, status: 'PENDING' } }).catch(() => ({ data: { total: 0 } })),
            api.get('/admissions/applications', { params: { page: 1, limit: 1, program: filter.program, department: filter.department, course: filter.course, status: 'REJECTED' } }).catch(() => ({ data: { total: 0 } })),
          ]);
          if (!mounted) return;
          setStats({ total, approved: approvedRes.data?.total ?? 0, pending: pendingRes.data?.total ?? 0, rejected: rejectedRes.data?.total ?? 0 });
        } else {
          // fetch global stats
          const res = await api.get('/admissions/stats');
          if (!mounted) return;
          setStats(res.data || {});
        }
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [JSON.stringify(filter || {})]);

  if (loading || !stats) return <div className="grid grid-cols-4 gap-4">{[0,1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded" />)}</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Total Applications" value={stats.total || 0} />
      <StatCard title="Approved" value={stats.approved || 0} />
      <StatCard title="Pending" value={stats.pending || 0} />
      <StatCard title="Rejected" value={stats.rejected || 0} />
    </div>
  );
}