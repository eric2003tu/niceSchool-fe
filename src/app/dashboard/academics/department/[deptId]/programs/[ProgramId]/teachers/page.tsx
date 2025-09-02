"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';

const TeachersPage: React.FC = () => {
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
        const res = await api.get(`/academics/programs/${programId}/teachers`);
        if (!mounted) return;
        const list = Array.isArray(res.data) ? res.data : extractList(res.data);
        setItems(list);
      } catch (err: any) {
        console.error('Failed to load teachers', err);
        if (!mounted) return;
        setError(err?.response?.data?.message || err?.message || 'Failed to load teachers');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [programId]);

  if (!programId) return <div>No program selected</div>;
  if (loading) return <div>Loading teachers...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Program Teachers</h1>
        <Link href={`/dashboard/academics/department/${params?.deptId}/programs/${programId}`} className="text-emerald-600">Back to program</Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No teachers found for this program.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((t: any) => {
            const id = t?.id || t?._id;
            return (
              <div key={id} className="p-4 bg-white rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{t?.firstName ? `${t.firstName} ${t.lastName || ''}`.trim() : (t?.name || 'Teacher')}</div>
                    {t?.email && <div className="text-xs text-gray-500">{t.email}</div>}
                    {t?.position && <div className="text-xs text-gray-500">{t.position}</div>}
                  </div>
                  <div className="text-sm text-gray-500">{t?.specializations?.join(', ')}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
