"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import AddCourseModal from '@/components/academics/AddCourseModal';

export default function ProgramCoursesPage() {
  const params = useParams() as { deptId?: string; ProgramId?: string };
  const programId = params?.ProgramId;

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (!programId) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/academics/courses?programId=${programId}`);
        setCourses(extractList(res.data));
      } catch (err: any) {
        setError(err?.response?.data?.message || err?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [programId]);

  if (!programId) return <div>No program selected</div>;
  if (loading) return <div>Loading courses...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <AddCourseModal open={showAdd} onClose={() => setShowAdd(false)} programId={programId} />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Courses</h2>
        <div>
          <button onClick={() => setShowAdd(true)} className="px-3 py-2 bg-emerald-600 text-white rounded-md">+ New Course</button>
        </div>
      </div>

      <div className="grid gap-3">
        {courses.map(c => (
          <div key={c.id} className="p-3 border rounded">
            <div className="font-semibold">{c.code} — {c.title}</div>
            {c.credits !== undefined && <div className="text-sm text-gray-600">Credits: {c.credits}</div>}
            {c.semester && <div className="text-sm text-gray-600">Semester: {c.semester}</div>}
          </div>
        ))}
        {courses.length === 0 && <div className="text-gray-600">No courses found</div>}
      </div>
    </div>
  );
}
