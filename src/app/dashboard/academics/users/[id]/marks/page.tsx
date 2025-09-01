"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';

const MarksPage: React.FC = () => {
  const params = useParams() as { ProgramId?: string; id?: string };
  const { ProgramId, id } = params;

  const [marks, setMarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ProgramId || !id) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/programs/${ProgramId}/users/${id}/marks`);
        setMarks(extractList(res.data));
      } catch (err: any) {
        console.error('Failed to load marks', err);
        setError(err?.message || 'Failed to load marks');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [ProgramId, id]);

  if (!ProgramId || !id) return <div>Missing identifiers</div>;
  if (loading) return <div>Loading marks...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Marks</h2>
      {marks.length === 0 ? (
        <p>No marks recorded.</p>
      ) : (
        <ul className="space-y-2">
          {marks.map(m => (
            <li key={m.id || `${m.courseId}-${m.type}`} className="p-3 border rounded">
              <div className="flex justify-between">
                <div>
                  <strong>{m.courseTitle || m.courseName || 'Course'}</strong>
                  <p className="text-sm text-gray-600">{m.type || m.assessmentType}</p>
                </div>
                <div className="text-lg font-semibold">{m.score ?? m.grade ?? 'N/A'}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MarksPage;