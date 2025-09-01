"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

const DeptProgramPage: React.FC = () => {
  const params = useParams() as { deptId?: string; ProgramId?: string };
  const programId = params?.ProgramId;

  const [program, setProgram] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/academics/programs/${programId}`);
        setProgram(res.data);
      } catch (err: any) {
        console.error('Failed to load program', err);
        setError(err?.response?.data?.message || err?.message || 'Failed to load program');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [programId]);

  if (!programId) return <div>No program selected</div>;
  if (loading) return <div>Loading program...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{program?.name || 'Program'}</h1>
      <p className="mt-2 text-gray-700">{program?.description}</p>

      <div className="mt-6 grid gap-2">
        <Link href={`./cohort`} className="text-emerald-600">Cohorts</Link>
        <Link href={`./courses`} className="text-emerald-600">Courses</Link>
        <Link href={`./enrollments`} className="text-emerald-600">Enrollments</Link>
        <Link href={`./users`} className="text-emerald-600">Users</Link>
      </div>
    </div>
  );
};

export default DeptProgramPage;
 