"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

const UserPage: React.FC = () => {
  const params = useParams() as { id?: string };
  const id = params?.id;

  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch (err: any) {
        console.error('Failed to load user', err);
        setError(err?.message || 'Failed to load user');
      } finally { setLoading(false); }
    };
    load();
  }, [id]);

  if (!id) return <div>No user selected</div>;
  if (loading) return <div>Loading user...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex items-center gap-4">
        <img src={user?.profileImage || '/person-m-3.webp'} alt={user?.firstName || 'User'} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
          <p className="text-sm text-gray-600">Role: {user?.role}</p>
        </div>
      </div>

      <div className="mt-4 space-x-3">
        <Link href={`/dashboard/academics`} className="text-emerald-600">Academics</Link>
        {/* If user belongs to a program, link to program-specific attendance/marks */}
        {user?.programId && (
          <>
            <Link href={`/dashboard/academics/department/${user.departmentId}/programs/${user.programId}/users/${id}/attendance`} className="text-emerald-600">Attendance</Link>
            <Link href={`/dashboard/academics/department/${user.departmentId}/programs/${user.programId}/users/${id}/marks`} className="text-emerald-600">Marks</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
