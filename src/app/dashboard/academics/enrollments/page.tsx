"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';

const EnrollmentsPage: React.FC = () => {
  const params = useParams() as { ProgramId?: string };
  const programId = params?.ProgramId;

  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) return;
    const load = async () => {
      try {
        setLoading(true);
  // backend: GET /academics/enrollments?programId=...
  const res = await api.get(`/academics/enrollments`, { params: { programId } });
  setEnrollments(extractList(res.data));
      } catch (err: any) {
        console.error('Failed to load enrollments', err);
        setError(err?.message || 'Failed to load enrollments');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [programId]);

  if (!programId) return <div>No program selected</div>;
  if (loading) return <div>Loading enrollments...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Enrollments</h2>
      {enrollments.length === 0 ? (
        <p>No enrollments found.</p>
      ) : (
        <ul className="space-y-2">
          {enrollments.map(e => (
            <li key={e.id || e._id} className="p-2 border rounded">{e.studentName || e.user?.name || e.studentId}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnrollmentsPage;
