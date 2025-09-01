"use client";
import React, { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

type Props = {
  open: boolean;
  onClose: () => void;
  programId?: string;
};

export default function AddCohortModal({ open, onClose, programId }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [intakeYear, setIntakeYear] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !intakeYear) {
      setError('Please provide name and intake year');
      return;
    }
    try {
      setLoading(true);
      await api.post('/academics/cohorts', { name, programId, intakeYear: Number(intakeYear) });
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to create cohort');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-semibold mb-3">Create Cohort</h3>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Name</div>
          <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <label className="block mb-4">
          <div className="text-sm text-gray-600">Intake Year</div>
          <input type="number" value={intakeYear as any} onChange={e => setIntakeYear(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          <button disabled={loading} type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">{loading ? 'Creating...' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}
