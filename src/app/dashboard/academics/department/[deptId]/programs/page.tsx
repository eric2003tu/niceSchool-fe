"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';
import ApplicationsAnalyticsRow from '@/components/application-component/ApplicationsAnalyticsRow';
import AddProgramModal from '@/components/academics/AddProgramModal';
import BackButton from '@/components/ui/BackButton';

const DeptProgramsPage: React.FC = () => {
  const params = useParams() as { deptId?: string };
  const deptId = params?.deptId;

  const [programs, setPrograms] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddProgram, setShowAddProgram] = useState(false);

  useEffect(() => {
    if (!deptId) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/academics/departments/${deptId}/programs`);
        setPrograms(extractList(res.data));
      } catch (err: any) {
        console.error('Failed to load programs', err);
        setError(err?.response?.data?.message || err?.message || 'Failed to load programs');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [deptId]);

  const filtered = useMemo(() => {
    if (!query) return programs;
    return programs.filter(p => (p.name || p.title || '').toLowerCase().includes(query.toLowerCase()));
  }, [programs, query]);

  // modern analytics state (simple examples)
  const [appCount, setAppCount] = useState<number | null>(null);
  const [studentCount, setStudentCount] = useState<number | null>(null);
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!deptId) return;
      try {
        // quick count for applications (small request)
        const appsRes = await api.get('/admissions/applications', { params: { page: 1, limit: 1, department: deptId } }).catch(() => ({ data: { total: 0 } }));
        const studentsRes = await api.get(`/academics/departments/${deptId}`).catch(() => ({ data: null }));
        if (!mounted) return;
        setAppCount(appsRes.data?.total ?? 0);
        // estimate students from dept object if available
        setStudentCount(studentsRes.data?.studentCount ?? studentsRes.data?.users?.length ?? null);
      } catch (e) {
        // ignore
      }
    };
    load();
    return () => { mounted = false; };
  }, [deptId]);

  if (!deptId) return <div>No department selected</div>;
  if (loading) return <div>Loading programs...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <AddProgramModal open={showAddProgram} onClose={() => setShowAddProgram(false)} departmentId={deptId} />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <BackButton href={deptId ? `/dashboard/academics/department/${deptId}` : '/dashboard/academics'} />
          <h2 className="text-xl font-bold">Programs</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowAddProgram(true)} className="px-3 py-2 bg-emerald-600 text-white rounded-md">+ New Program</button>
        </div>
      </div>

      <div className="mb-4">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search programs..." className="w-full max-w-md px-3 py-2 border rounded" />
      </div>

      {/* Department quick actions and analytics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">Department Applications</div>
          <div className="mt-2 text-2xl font-semibold">{appCount ?? '—'}</div>
          <div className="mt-3">
            <Link href={`/dashboard/academics/department/${deptId}/applications`} className="inline-block px-3 py-2 bg-emerald-600 text-white rounded-md">View department applications</Link>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">Programs</div>
          <div className="mt-2 text-2xl font-semibold">{programs.length}</div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">Courses (all programs)</div>
          <div className="mt-2 text-2xl font-semibold">{programs.reduce((s, p) => s + (p.courses?.length || 0), 0)}</div>
        </div>
      </div>

      {/* Modern analytics area */}
      <section className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Department Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <div className="text-sm text-gray-500">Total Applications</div>
            <div className="mt-2 text-2xl font-semibold">{appCount ?? '—'}</div>
            <div className="text-xs text-gray-400 mt-1">Trend: +6% vs last month</div>
          </div>

          <div className="p-4 border rounded">
            <div className="text-sm text-gray-500">Enrolled Students</div>
            <div className="mt-2 text-2xl font-semibold">{studentCount ?? '—'}</div>
            <div className="text-xs text-gray-400 mt-1">Active this term</div>
          </div>

          <div className="p-4 border rounded">
            <div className="text-sm text-gray-500">Application Conversion</div>
            <div className="mt-2 text-2xl font-semibold">{appCount && studentCount ? `${Math.round((studentCount / Math.max(1, appCount)) * 100)}%` : '—'}</div>
            <div className="text-xs text-gray-400 mt-1">Applicants → Enrolled</div>
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <p>No programs found for this department.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => {
            const pid = p.id || p._id;
            return (
              <div key={pid} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-700">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Courses</p>
                    <p className="font-bold">{p.courses?.length || 0}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <Link href={`/dashboard/academics/department/${deptId}/programs/${pid}`} className="text-emerald-600">Open</Link>
                  <div className="text-sm text-gray-500">Cohorts: {p.cohorts?.length || 0}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeptProgramsPage;
 