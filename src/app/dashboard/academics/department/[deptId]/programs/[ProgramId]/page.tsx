"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';

const DeptProgramPage: React.FC = () => {
  const params = useParams() as { deptId?: string; ProgramId?: string };
  const programId = params?.ProgramId;

  const [program, setProgram] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deptId = params?.deptId;

  useEffect(() => {
    if (!programId) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // try single-program endpoint first
        const res = await api.get(`/academics/programs/${programId}`);
        if (!mounted) return;
        setProgram(res.data);
      } catch (err: any) {
        // fallback: try department programs list and find the program by id
        try {
          if (!deptId) throw err;
          const listRes = await api.get(`/academics/departments/${deptId}/programs`);
          const list = extractList(listRes.data);
          const found = list.find((p: any) => (p.id === programId || p._id === programId));
          if (found) {
            if (!mounted) return;
            setProgram(found);
          } else {
            throw err;
          }
        } catch (e: any) {
          console.error('Failed to load program (fallback)', e);
          if (!mounted) return;
          setError(e?.response?.data?.message || e?.message || 'Failed to load program');
          setLoading(false);
          return;
        }
      }

      // attempt to fetch related lists (courses, cohorts) which have dedicated endpoints
      try {
        const [coursesRes, cohortsRes] = await Promise.all([
          api.get(`/academics/programs/${programId}/courses`).catch(() => ({ data: [] })),
          api.get(`/academics/programs/${programId}/cohorts`).catch(() => ({ data: [] })),
        ]);
        if (!mounted) return;
        setProgram((prev: any) => ({ ...(prev || {}), courses: extractList(coursesRes.data), cohorts: extractList(cohortsRes.data) }));
      } catch (e) {
        // non-fatal
        console.debug('Failed to fetch related lists for program', e);
      }

      if (mounted) setLoading(false);
    };
    load();
    return () => { mounted = false; };
  }, [programId, deptId]);
  const stats = useMemo(() => ({
    courses: program?.courses?.length ?? program?.courseCount ?? 0,
    cohorts: program?.cohorts?.length ?? program?.cohortCount ?? 0,
    users: program?.users?.length ?? program?.userCount ?? 0,
    enrollments: program?.enrollments?.length ?? program?.enrollmentCount ?? (program?.cohorts ? program.cohorts.reduce((s: number, c: any) => s + (c.enrollments?.length ?? 0), 0) : 0),
  }), [program]);

  if (!programId) return <div>No program selected</div>;
  if (loading) return <div>Loading program...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{program?.name || 'Program'}</h1>
          {program?.description && <p className="mt-1 text-sm text-gray-600">{program.description}</p>}
        </div>
      </header>

      {/* Analytics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg shadow flex flex-col">
          <div className="text-sm text-gray-500">Courses</div>
          <div className="mt-2 text-2xl font-semibold">{stats.courses}</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col">
          <div className="text-sm text-gray-500">Cohorts</div>
          <div className="mt-2 text-2xl font-semibold">{stats.cohorts}</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col">
          <div className="text-sm text-gray-500">Enrollments</div>
          <div className="mt-2 text-2xl font-semibold">{stats.enrollments}</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col">
          <div className="text-sm text-gray-500">Users</div>
          <div className="mt-2 text-2xl font-semibold">{stats.users}</div>
        </div>
      </section>

      {/* Navigation cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href={`/dashboard/academics/department/${deptId}/programs/${programId}/courses`} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-sm text-gray-500">Courses</div>
          <div className="mt-3 text-lg font-semibold">Manage Courses</div>
          <div className="mt-2 text-sm text-gray-600">Create, edit and view course material for this program.</div>
        </Link>

        <Link href={`/dashboard/academics/department/${deptId}/programs/${programId}/cohort`} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-sm text-gray-500">Cohorts</div>
          <div className="mt-3 text-lg font-semibold">Manage Cohorts</div>
          <div className="mt-2 text-sm text-gray-600">Create and manage program cohorts and intakes.</div>
        </Link>

        <Link href={`/dashboard/academics/department/${deptId}/programs/${programId}/users`} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-sm text-gray-500">Users</div>
          <div className="mt-3 text-lg font-semibold">Program Users</div>
          <div className="mt-2 text-sm text-gray-600">View enrolled students and assigned faculty.</div>
        </Link>

        <Link href={`/dashboard/academics/department/${deptId}/programs/${programId}/enrollments`} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-sm text-gray-500">Enrollments</div>
          <div className="mt-3 text-lg font-semibold">Manage Enrollments</div>
          <div className="mt-2 text-sm text-gray-600">Enroll students and review enrollment status.</div>
        </Link>
      </section>

      {/* Additional analytics below navigation */}
      <section className="mt-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Program Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 border rounded">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Avg Courses / Cohort</div>
                <div className="mt-1 text-xl font-semibold">{(stats.courses && stats.cohorts) ? (Math.round((stats.courses / Math.max(1, stats.cohorts)) * 10) / 10) : '—'}</div>
              </div>
              <div className="text-sm text-green-600">+4% <span className="text-gray-400">vs last term</span></div>
            </div>
          </div>

          <div className="p-3 border rounded">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Student / Faculty Ratio</div>
                <div className="mt-1 text-xl font-semibold">{program?.studentFacultyRatio ?? '—'}</div>
              </div>
              <div className="text-sm text-red-600">-1% <span className="text-gray-400">vs last term</span></div>
            </div>
          </div>

          <div className="p-3 border rounded">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Active Enrollments</div>
                <div className="mt-1 text-xl font-semibold">{stats.enrollments}</div>
              </div>
              <div className="text-sm text-green-600">+12% <span className="text-gray-400">vs last term</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeptProgramPage;
 