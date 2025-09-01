"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

const DeptCoursePage: React.FC = () => {
  const params = useParams() as { deptId?: string; ProgramId?: string; id?: string };
  const courseId = params?.id;

  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/academics/courses/${courseId}`);
        setCourse(res.data);
      } catch (err: any) {
        console.error('Failed to load course', err);
        setError(err?.response?.data?.message || err?.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  if (!courseId) return <div>No course selected</div>;
  if (loading) return <div>Loading course...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{course?.title || course?.name || 'Course'}</h1>
      <p className="mt-2 text-gray-700">{course?.description}</p>

      <div className="mt-6 space-x-4">
        <Link href={`../assignments`} className="text-emerald-600">Assignments</Link>
        <Link href={`../exams`} className="text-emerald-600">Exams</Link>
      </div>
    </div>
  );
};

export default DeptCoursePage;
 