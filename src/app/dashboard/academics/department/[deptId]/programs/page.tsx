"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';

const DeptProgramsPage: React.FC = () => {
  const params = useParams() as { deptId?: string };
  const deptId = params?.deptId;

  const [programs, setPrograms] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!deptId) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/academics/departments/${deptId}/programs`);
        setPrograms(extractList(res.data));
      } catch (err: any) {
        console.error('Failed to load programs', err);
        setError(err?.response?.data?.message || err?.message || 'Failed to load programs');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [deptId]);

  const filtered = useMemo(() => {
    if (!query) return programs;
    return programs.filter(p => (p.name || p.title || '').toLowerCase().includes(query.toLowerCase()));
  }, [programs, query]);

  if (!deptId) return <div>No department selected</div>;
  if (loading) return <div>Loading programs...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Programs</h2>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/academics/programs/create?deptId=${deptId}`} className="px-3 py-2 bg-emerald-600 text-white rounded-md">+ New Program</Link>
        </div>
      </div>

      <div className="mb-4">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search programs..." className="w-full max-w-md px-3 py-2 border rounded" />
      </div>

      {filtered.length === 0 ? (
        <p>No programs found for this department.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div key={p.id || p._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Courses</p>
                  <p className="font-bold">{p.courses?.length || 0}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Link href={`./${p.id}`} className="text-emerald-600">Open</Link>
                <div className="text-sm text-gray-500">Cohorts: {p.cohorts?.length || 0}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeptProgramsPage;
 