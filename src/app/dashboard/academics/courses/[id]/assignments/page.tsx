"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';

const AssignmentsPage: React.FC = () => {
  const params = useParams() as { id?: string };
  const courseId = params?.id;

  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/courses/${courseId}/assignments`);
        setAssignments(extractList(res.data));
      } catch (err: any) {
        console.error('Failed to load assignments', err);
        setError(err?.message || 'Failed to load assignments');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  if (!courseId) return <div>No course selected</div>;
  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Assignments</h2>
        <Link href={`./create-assignment`} className="text-emerald-600">Create Assignment</Link>
      </div>

      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <ul className="space-y-2">
          {assignments.map(a => (
            <li key={a.id || a._id} className="p-3 border rounded">
              <strong>{a.title}</strong>
              <p className="text-sm text-gray-600">Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentsPage;
