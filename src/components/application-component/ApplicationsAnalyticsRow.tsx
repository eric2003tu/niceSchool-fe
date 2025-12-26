"use client";

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { ApplicationStatus } from '@/components/application-component/Admin';

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
          const res = await api.get('/admissions/applications', { 
            params: { 
              page: 1, 
              limit: 1, 
              program: filter.program, 
              department: filter.department, 
              course: filter.course 
            } 
          });
          
          // backend returns { data, total, page, limit }
          const total = res.data?.total ?? 0;
          
          // Use the new stats endpoint or fetch with valid statuses
          try {
            // First try to get stats from the dedicated stats endpoint
            const statsRes = await api.get('/admissions/stats');
            if (mounted && statsRes.data) {
              setStats({
                total,
                admitted: statsRes.data.byStatus?.admitted || 0,
                submitted: statsRes.data.byStatus?.submitted || 0,
                rejected: statsRes.data.byStatus?.rejected || 0,
                draft: statsRes.data.byStatus?.draft || 0,
                under_review: statsRes.data.byStatus?.under_review || 0,
                interview_scheduled: statsRes.data.byStatus?.interview_scheduled || 0,
                conditionally_admitted: statsRes.data.byStatus?.conditionally_admitted || 0,
                waitlisted: statsRes.data.byStatus?.waitlisted || 0,
                withdrawn: statsRes.data.byStatus?.withdrawn || 0,
              });
              return;
            }
          } catch (statsError) {
            // If stats endpoint fails, fall back to individual queries with VALID statuses
            console.log('Stats endpoint not available, falling back to individual queries');
          }

          // Fallback: fetch status breakdown individually with VALID statuses
          const [admittedRes, submittedRes, rejectedRes] = await Promise.all([
            api.get('/admissions/applications', { 
              params: { 
                page: 1, 
                limit: 1, 
                program: filter.program, 
                department: filter.department, 
                course: filter.course, 
                status: 'ADMITTED'  // Changed from 'APPROVED'
              } 
            }).catch(() => ({ data: { total: 0 } })),
            api.get('/admissions/applications', { 
              params: { 
                page: 1, 
                limit: 1, 
                program: filter.program, 
                department: filter.department, 
                course: filter.course, 
                status: 'SUBMITTED'  // Changed from 'PENDING'
              } 
            }).catch(() => ({ data: { total: 0 } })),
            api.get('/admissions/applications', { 
              params: { 
                page: 1, 
                limit: 1, 
                program: filter.program, 
                department: filter.department, 
                course: filter.course, 
                status: 'REJECTED' 
              } 
            }).catch(() => ({ data: { total: 0 } })),
          ]);
          
          if (!mounted) return;
          setStats({ 
            total, 
            admitted: admittedRes.data?.total ?? 0, 
            submitted: submittedRes.data?.total ?? 0, 
            rejected: rejectedRes.data?.total ?? 0 
          });
        } else {
          // fetch global stats from the stats endpoint
          const res = await api.get('/admissions/stats');
          if (!mounted) return;
          
          // Transform the stats to match what your component expects
          const statsData = res.data || {};
          setStats({
            total: statsData.total || 0,
            admitted: statsData.byStatus?.admitted || 0,
            submitted: statsData.byStatus?.submitted || 0,
            rejected: statsData.byStatus?.rejected || 0,
            // Include other statuses if needed
            pending: statsData.byStatus?.submitted || 0, // Map submitted to pending for backward compatibility
            draft: statsData.byStatus?.draft || 0,
            under_review: statsData.byStatus?.under_review || 0,
            interview_scheduled: statsData.byStatus?.interview_scheduled || 0,
            conditionally_admitted: statsData.byStatus?.conditionally_admitted || 0,
            waitlisted: statsData.byStatus?.waitlisted || 0,
            withdrawn: statsData.byStatus?.withdrawn || 0,
          });
        }
      } catch (e) {
        console.error('Error loading application stats:', e);
        // Set default stats on error
        if (mounted) {
          setStats({ 
            total: 0, 
            admitted: 0, 
            submitted: 0, 
            rejected: 0,
            pending: 0 
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [JSON.stringify(filter || {})]);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Total Applications" value={stats.total || 0} />
      <StatCard title="Admitted" value={stats.admitted || 0} subtitle={`${stats.total > 0 ? Math.round((stats.admitted / stats.total) * 100) : 0}% admit rate`} />
      <StatCard title="Submitted" value={stats.submitted || 0} subtitle="Awaiting review" />
      <StatCard title="Rejected" value={stats.rejected || 0} />
    </div>
  );
}