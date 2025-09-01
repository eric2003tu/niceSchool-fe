"use client";
import React, { useEffect, useMemo, useState } from 'react';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AddDepartmentModal from '@/components/academics/AddDepartmentModal';

const DepartmentsPage = (): React.ReactElement => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDept, setShowAddDept] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get('/academics/departments');
        const list = extractList(res.data);
        setDepartments(list);
      } catch (err: any) {
        console.error('Failed to load departments', err);
        setError(err?.response?.data?.message || err?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totals = useMemo(() => {
    const totalDepartments = departments.length;
    const totalPrograms = departments.reduce((s, d) => s + (d.programs?.length || 0), 0);
    const totalCourses = departments.reduce((s, d) => s + (d.courses?.length || 0), 0);
    return { totalDepartments, totalPrograms, totalCourses };
  }, [departments]);

  if (loading) return <div>Loading departments...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <AddDepartmentModal open={showAddDept} onClose={() => setShowAddDept(false)} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Departments</h1>
          <p className="text-sm text-gray-500">Manage academic departments and their programs</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowAddDept(true)} className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md shadow">+ Add Department</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Departments</p>
          <p className="text-2xl font-bold">{totals.totalDepartments}</p>
        </div>
        <div className="p-4 rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Programs</p>
          <p className="text-2xl font-bold">{totals.totalPrograms}</p>
        </div>
        <div className="p-4 rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Courses</p>
          <p className="text-2xl font-bold">{totals.totalCourses}</p>
        </div>
      </div>

      {departments.length === 0 ? (
        <p>No departments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {departments.map((d: any) => (
            <div key={d.id || d._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700">{d.name || d.title || 'Untitled'}</h3>
                  <p className="text-sm text-gray-500 mt-1">{d.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Programs</p>
                  <p className="font-bold">{d.programs?.length || 0}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Link href={`/dashboard/academics/department/${d.id || d._id}/programs`} className="text-emerald-600 font-medium">View Programs</Link>
                <div className="text-sm text-gray-500">Courses: {d.courses?.length || 0}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;
