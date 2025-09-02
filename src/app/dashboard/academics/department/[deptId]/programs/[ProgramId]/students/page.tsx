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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Program Students</h1>
        <Link href={`/dashboard/academics/department/${params?.deptId}/programs/${programId}`} className="text-emerald-600">Back to program</Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No students found for this program.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((enrollment: any) => {
            const student = enrollment?.student || enrollment;
            const cohort = enrollment?.cohort || enrollment?.cohortId || null;
            const id = student?.id || student?._id || enrollment?.id;
            return (
              <div key={id} className="p-4 bg-white rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{(student?.firstName || student?.name) ? `${student?.firstName || ''} ${student?.lastName || ''}`.trim() : (student?.fullName || student?.name || 'Student')}</div>
                    {student?.studentNumber && <div className="text-xs text-gray-500">#{student.studentNumber}</div>}
                    {student?.email && <div className="text-xs text-gray-500">{student.email}</div>}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{cohort?.name || cohort || ''}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
