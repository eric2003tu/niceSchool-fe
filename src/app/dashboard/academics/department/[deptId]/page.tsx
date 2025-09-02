"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import ApplicationsAnalyticsRow from '@/components/application-component/ApplicationsAnalyticsRow';
import AddProgramModal from '@/components/academics/AddProgramModal';

const DeptPage = (): React.ReactElement => {
  const params = useParams() as { deptId?: string };
  const deptId = params?.deptId;

  const [dept, setDept] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddProgram, setShowAddProgram] = useState(false);

  useEffect(() => {
    if (!deptId) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/academics/departments/${deptId}`);
        setDept(res.data);
      } catch (err: any) {
        console.error('Failed to load department', err);
        setError(err?.response?.data?.message || err?.message || 'Failed to load department');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [deptId]);

  const stats = useMemo(() => ({
    programs: dept?.programs?.length || 0,
    courses: dept?.courses?.length || 0,
    cohorts: dept?.programs?.reduce((s: number, p: any) => s + (p.cohorts?.length || 0), 0) || 0,
  }), [dept]);

  if (!deptId) return <div>No department selected</div>;
  if (loading) return <div>Loading department...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <AddProgramModal open={showAddProgram} onClose={() => setShowAddProgram(false)} departmentId={deptId} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold">{dept?.name || 'Department'}</h1>
          <p className="text-sm text-gray-500">{dept?.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowAddProgram(true)} className="px-3 py-2 bg-emerald-600 text-white rounded-md">+ Add Program</button>
          <Link href={`/dashboard/academics/courses/create?deptId=${deptId}`} className="px-3 py-2 bg-blue-600 text-white rounded-md">+ Add Course</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Programs</p>
          <p className="text-2xl font-bold">{stats.programs}</p>
        </div>
        <div className="p-4 rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Courses</p>
          <p className="text-2xl font-bold">{stats.courses}</p>
        </div>
        <div className="p-4 rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Cohorts</p>
          <p className="text-2xl font-bold">{stats.cohorts}</p>
        </div>
      </div>

      <div className="mb-6">
        <Link href={`/dashboard/academics/department/${deptId}/applications`} className="inline-block px-3 py-2 bg-emerald-600 text-white rounded-md">View all department applications</Link>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Programs in this department</h2>
        {(!dept?.programs || dept.programs.length === 0) ? (
          <p className="text-gray-500">No programs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dept.programs.map((p: any) => {
              const pid = p.id || p._id;
              return (
              <div key={pid} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-emerald-700">{p.name}</h3>
                    <p className="text-sm text-gray-500">Level: {p.level}</p>
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
    </div>
  );
};

export default DeptPage;
