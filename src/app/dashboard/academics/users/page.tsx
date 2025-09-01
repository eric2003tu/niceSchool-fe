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
        // backend exposes program-scoped users via the academics service as a query
        const res = await api.get(`/academics/users`, { params: { programId } });
        // normalize list shapes (array or { data: [] })
        setUsers(extractList(res.data));
      } catch (err: any) {
        console.error('Failed to load users', err);
        setError(err?.response?.data?.message || err?.message || 'Failed to load users');
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
          {users.map(u => {
            const id = u.id || u._id || u.userId || u.studentId || u.id;
            const name = u.name ?? (u.firstName ? `${u.firstName} ${u.lastName ?? ''}` : u.email ?? 'Unknown');
            return (
              <li key={id || Math.random()} className="p-2 border rounded cursor-pointer" onClick={() => id && router.push(`/dashboard/users/${id}`)}>
                {name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProgramUsersPage;
