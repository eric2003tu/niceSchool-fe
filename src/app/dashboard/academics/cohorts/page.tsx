"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';

const CohortPage: React.FC = () => {
  const params = useParams() as { ProgramId?: string };
  const programId = params?.ProgramId;

  const [cohorts, setCohorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) return;
    const load = async () => {
      try {
        setLoading(true);
  // backend: GET /academics/cohorts?programId=...
  const res = await api.get(`/academics/cohorts`, { params: { programId } });
  setCohorts(extractList(res.data));
      } catch (err: any) {
        console.error('Failed to load cohorts', err);
        setError(err?.message || 'Failed to load cohorts');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [programId]);

  if (!programId) return <div>No program selected</div>;
  if (loading) return <div>Loading cohorts...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Cohorts</h2>
      {cohorts.length === 0 ? (
        <p>No cohorts found.</p>
      ) : (
        <ul className="space-y-2">
          {cohorts.map(c => (
            <li key={c.id || c._id} className="p-2 border rounded">{c.name || c.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CohortPage;
