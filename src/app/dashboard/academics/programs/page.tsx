"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';

const ProgramsPage: React.FC = () => {
  const params = useParams() as { deptId?: string };
  const deptId = params?.deptId;

  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!deptId) return;
    const load = async () => {
      try {
        setLoading(true);
  // backend: GET /academics/departments/:deptId/programs
  const res = await api.get(`/academics/departments/${deptId}/programs`);
  const list = extractList(res.data);
  setPrograms(list);
      } catch (err: any) {
        console.error('Failed to load programs', err);
        setError(err?.message || 'Failed to load programs');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [deptId]);

  if (!deptId) return <div>No department selected</div>;
  if (loading) return <div>Loading programs...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Programs</h1>
      {programs.length === 0 ? (
        <p>No programs found for this department.</p>
      ) : (
        <ul className="grid gap-3">
          {programs.map((p: any) => (
            <li key={p.id || p._id} className="p-3 border rounded">
              <strong>{p.name || p.title}</strong>
              <p className="text-sm text-gray-600">{p.summary || p.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProgramsPage;
