"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api, { extractList } from '@/lib/api';

const ProgramUsersPage: React.FC = () => {
  const params = useParams() as { ProgramId?: string };
  const programId = params?.ProgramId;
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) return;
    const load = async () => {
      try {
        setLoading(true);
        // Prefer program-scoped students endpoint which returns enrollments with student included
        const res = await api.get(`/academics/programs/${programId}/students`).catch(() => ({ data: [] }));
        // backend returns enrollments with student: map to student objects
        const payload = extractList(res.data);
        const mapped = payload.map((e: any) => (e.student ? { ...e.student, enrollment: e } : e));
        setUsers(mapped);
      } catch (err: any) {
        console.error('Failed to load users', err);
        setError(err?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [programId]);

  if (!programId) return <div>No program selected</div>;
  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Program Users</h2>
      {users.length === 0 ? (
        <p>No users found for this program.</p>
      ) : (
        <ul className="space-y-2">
          {users.map(u => (
            <li key={u.id || u._id} className="p-2 border rounded cursor-pointer" onClick={() => router.push(`/dashboard/users/${u.id || u._id}`)}>
              {u.name || u.firstName + ' ' + u.lastName || u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProgramUsersPage;
