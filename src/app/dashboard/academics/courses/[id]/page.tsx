"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

const CoursePage: React.FC = () => {
  const params = useParams() as { deptId?: string; ProgramId?: string; id?: string };
  const { id: courseId, ProgramId } = params;

  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    const load = async () => {
      try {
        setLoading(true);
  // backend: GET /academics/courses/:id
  const res = await api.get(`/academics/courses/${courseId}`);
  setCourse(res.data);
      } catch (err: any) {
        console.error('Failed to load course', err);
        setError(err?.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  if (!courseId) return <div>No course selected</div>;
  if (loading) return <div>Loading course...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  // derive user role from localStorage (best-effort)
  let userRole = '';
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      userRole = (parsed.role || '').toUpperCase();
    }
  } catch (e) {
    // ignore parse errors
  }

  const canManage = userRole === 'ADMIN' || userRole === 'FACULTY';

  return (
    <div>
      <h1 className="text-2xl font-bold">{course?.title || course?.name || 'Course'}</h1>
      <p className="mt-2 text-gray-700">{course?.description}</p>

      <div className="mt-6 space-x-4">
        <Link href={`./assignments`} className="text-emerald-600">Assignments</Link>
        <Link href={`./exams`} className="text-emerald-600">Exams</Link>
        {canManage && (
          <>
            <Link href={`./assignments/create-assignment`} className="ml-2 inline-block px-3 py-1 bg-blue-600 text-white rounded">Create Assignment</Link>
            <Link href={`./exams/create-exam`} className="ml-2 inline-block px-3 py-1 bg-indigo-600 text-white rounded">Create Exam</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
