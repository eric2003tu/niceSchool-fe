"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';

const AttendancePage: React.FC = () => {
  const params = useParams() as { deptId?: string; ProgramId?: string; id?: string };
  const { deptId, ProgramId, id } = params;
  const router = useRouter();

  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ProgramId || !id) return;
    const load = async () => {
      try {
        setLoading(true);
  // backend: GET /academics/attendance?programId=...&userId=... or /academics/users/:id/attendance
  const res = await api.get(`/academics/attendance`, { params: { programId: ProgramId, userId: id } });
  setRecords(extractList(res.data));
      } catch (err: any) {
        console.error('Failed to load attendance', err);
        setError(err?.message || 'Failed to load attendance');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [ProgramId, id]);

  if (!ProgramId || !id) return <div>Missing identifiers</div>;
  if (loading) return <div>Loading attendance...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Attendance</h2>
        <div className="space-x-2">
          <Link href={`../`} className="text-emerald-600">Back to User</Link>
          <button onClick={() => router.back()} className="text-gray-600">Back</button>
        </div>
      </div>

      {records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <ul className="space-y-2">
          {records.map((r) => (
            <li key={r.id || `${r.date}-${r.status}`} className="p-3 border rounded-md flex justify-between">
              <div>
                <p className="font-medium">{new Date(r.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">{r.note || ''}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${r.status === 'present' ? 'bg-green-100 text-green-700' : r.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {r.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendancePage;
