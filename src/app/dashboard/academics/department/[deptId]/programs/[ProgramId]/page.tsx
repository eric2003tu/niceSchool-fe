"use client";
import React, { useEffect, useMemo, useState } from 'react';
import BackButton from '@/components/ui/BackButton';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';
import ApplicationsAnalyticsRow from '@/components/application-component/ApplicationsAnalyticsRow';

const DeptProgramPage: React.FC = () => {
  const params = useParams() as { deptId?: string; ProgramId?: string };
  const programId = params?.ProgramId;

  const [program, setProgram] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appCount, setAppCount] = useState<number | null>(null);

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

      // fetch program-level counts: students, teachers, enrollments, applications
      try {
        const [studentsRes, teachersRes, enrollmentsRes, appsRes] = await Promise.all([
          api.get(`/academics/programs/${programId}/students`).catch(() => ({ data: [] })),
          api.get(`/academics/programs/${programId}/teachers`).catch(() => ({ data: [] })),
          api.get(`/academics/programs/${programId}/enrollments`).catch(() => ({ data: [] })),
          api.get('/admissions/applications', { params: { page: 1, limit: 1, program: programId } }).catch(() => ({ data: { total: 0 } })),
        ]);
        if (!mounted) return;
        setProgram((prev: any) => ({ ...(prev || {}), studentsCount: Array.isArray(studentsRes.data) ? studentsRes.data.length : (studentsRes.data?.total ?? 0), teachersCount: Array.isArray(teachersRes.data) ? teachersRes.data.length : (teachersRes.data?.total ?? 0), enrollmentsCount: Array.isArray(enrollmentsRes.data) ? enrollmentsRes.data.length : (enrollmentsRes.data?.total ?? 0) }));
        setAppCount(appsRes.data?.total ?? 0);
      } catch (e) {
        // ignore
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
        <div className="flex items-center gap-4">
          <BackButton label="Back to Programs" />
          <div>
            <h1 className="text-2xl font-bold">{program?.name || 'Program'}</h1>
            {program?.description && <p className="mt-1 text-sm text-gray-600">{program.description}</p>}
          </div>
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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Link href={`/dashboard/academics/department/${deptId}/programs/${programId}/applications`} className="inline-block px-3 py-2 bg-emerald-600 text-white rounded-md">View program applications</Link>
        <Link href={`/dashboard/academics/department/${deptId}/applications`} className="inline-block px-3 py-2 bg-gray-100 text-gray-800 rounded-md">View department applications</Link>
      </div>

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

        <Link href={`/dashboard/academics/department/${deptId}/programs/${programId}/students`} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-sm text-gray-500">Students</div>
          <div className="mt-3 text-lg font-semibold">Program Students</div>
          <div className="mt-2 text-sm text-gray-600">View and manage students enrolled in this program.</div>
        </Link>

        <Link href={`/dashboard/academics/department/${deptId}/programs/${programId}/teachers`} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-sm text-gray-500">Teachers</div>
          <div className="mt-3 text-lg font-semibold">Program Teachers</div>
          <div className="mt-2 text-sm text-gray-600">View and manage faculty assigned to this program.</div>
        </Link>

        <Link href={`/dashboard/academics/department/${deptId}/programs/${programId}/enrollments`} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-sm text-gray-500">Enrollments</div>
          <div className="mt-3 text-lg font-semibold">Manage Enrollments</div>
          <div className="mt-2 text-sm text-gray-600">Enroll students and review enrollment status.</div>
        </Link>
        <Link href={`/dashboard/academics/department/${deptId}/programs/${programId}/applications`} className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-sm text-gray-500">Applications</div>
          <div className="mt-3 text-lg font-semibold">Program Applications</div>
          <div className="mt-2 text-sm text-gray-600">View and manage applications for this program.</div>
        </Link>
      </section>

      {/* Additional analytics below navigation */}
          <section className="mt-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Program Analytics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Total Applications</div>
                <div className="mt-2 text-2xl font-semibold">{appCount ?? '—'}</div>
                <div className="text-xs text-gray-400 mt-1">All time</div>
              </div>

              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Students</div>
                <div className="mt-2 text-2xl font-semibold">{program?.studentsCount ?? '—'}</div>
                <div className="text-xs text-gray-400 mt-1">Enrolled</div>
              </div>

              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Teachers</div>
                <div className="mt-2 text-2xl font-semibold">{program?.teachersCount ?? '—'}</div>
                <div className="text-xs text-gray-400 mt-1">Assigned</div>
              </div>

              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Enrollments</div>
                <div className="mt-2 text-2xl font-semibold">{program?.enrollmentsCount ?? stats.enrollments}</div>
                <div className="text-xs text-gray-400 mt-1">Active</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Courses</div>
                <div className="mt-2 text-2xl font-semibold">{stats.courses}</div>
                <div className="text-xs text-gray-400 mt-1">Total across program</div>
              </div>

              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Cohorts</div>
                <div className="mt-2 text-2xl font-semibold">{stats.cohorts}</div>
                <div className="text-xs text-gray-400 mt-1">Intakes</div>
              </div>

              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Avg Courses / Cohort</div>
                <div className="mt-2 text-2xl font-semibold">{(stats.courses && stats.cohorts) ? (Math.round((stats.courses / Math.max(1, stats.cohorts)) * 10) / 10) : '—'}</div>
                <div className="text-xs text-gray-400 mt-1">Average</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Student / Faculty Ratio</div>
                <div className="mt-2 text-2xl font-semibold">{(() => {
                  const students = program?.studentsCount ?? 0;
                  const teachers = program?.teachersCount ?? 0;
                  return (teachers > 0) ? `${Math.round((students / teachers) * 10) / 10}:1` : '—';
                })()}</div>
                <div className="text-xs text-gray-400 mt-1">Students per teacher</div>
              </div>

              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Application Conversion</div>
                <div className="mt-2 text-2xl font-semibold">{(() => {
                  const students = program?.studentsCount ?? 0;
                  const apps = appCount ?? 0;
                  return (apps > 0) ? `${Math.round((students / apps) * 100)}%` : '—';
                })()}</div>
                <div className="text-xs text-gray-400 mt-1">Applicants → Enrolled</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Application status breakdown</h4>
              <ApplicationsAnalyticsRow filter={{ program: programId }} />
            </div>
          </section>
    </div>
  );
};

export default DeptProgramPage;
 