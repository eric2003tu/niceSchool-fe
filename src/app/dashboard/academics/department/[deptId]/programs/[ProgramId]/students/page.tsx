"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';

const StudentsPage: React.FC = () => {
  const params = useParams() as { deptId?: string; ProgramId?: string };
  const programId = params?.ProgramId;

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!programId) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/academics/programs/${programId}/students`);
        if (!mounted) return;
        // endpoint may return enrollments with student included
        const list = Array.isArray(res.data) ? res.data : extractList(res.data);
        setItems(list);
      } catch (err: any) {
        console.error('Failed to load students', err);
        if (!mounted) return;
        setError(err?.response?.data?.message || err?.message || 'Failed to load students');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [programId]);

  if (!programId) return <div>No program selected</div>;
  if (loading) return <div>Loading students...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const filtered = items.filter(enrollment => {
    const student = enrollment?.student || enrollment || {};
    const name = ((student.firstName || '') + ' ' + (student.lastName || '')).toLowerCase();
    const email = (student.email || '').toLowerCase();
    const num = (student.studentNumber || '').toString().toLowerCase();
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return name.includes(q) || email.includes(q) || num.includes(q);
  });

  const fmtDate = (d?: string) => {
    if (!d) return '-';
    try { return new Date(d).toLocaleString(); } catch { return d; }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Program Students</h1>
          <p className="text-sm text-gray-500">Students enrolled in this program.</p>
        </div>
        <div className="flex items-center gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, email or student #" className="px-3 py-2 border rounded w-72" />
          <Link href={`/dashboard/academics/department/${params?.deptId}/programs/${programId}`} className="text-emerald-600">Back to program</Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">GPA</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrolled At</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((enrollment: any, idx) => {
              const student = enrollment?.student || enrollment || {};
              const cohort = enrollment?.cohort || enrollment?.cohortId || null;
              const id = student?.id || student?._id || enrollment?.id || idx;
              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.studentNumber || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{(student.firstName || student.lastName) ? `${student.firstName || ''} ${student.lastName || ''}`.trim() : (student.fullName || student.name || 'Student')}</div>
                    <div className="text-xs text-gray-500">{student?.personalInfo?.nationality || ''}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.email || student?.personalInfo?.email || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.phone || student?.personalInfo?.phone || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.isActive || student.isActive}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student?.academicInfo?.gpa ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fmtDate(enrollment?.enrolledAt || student?.createdAt)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/dashboard/academics/users/${student.id}`} className="text-emerald-600 hover:underline mr-4">View</Link>
                    {student?.documents && (
                      <a href={student.documents.transcript} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Transcript</a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-500">No students match your search.</div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
