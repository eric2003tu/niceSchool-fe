"use client";
import React, { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

type Props = {
  open: boolean;
  onClose: () => void;
  departmentId?: string;
};

const LEVELS = ['UNDERGRAD','POSTGRAD','DIPLOMA','CERTIFICATE'];

export default function AddProgramModal({ open, onClose, departmentId }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [level, setLevel] = useState(LEVELS[0]);
  const [durationYears, setDurationYears] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !code || !level || !durationYears) {
      setError('Please fill required fields');
      return;
    }
    try {
      setLoading(true);
      await api.post('/academics/programs', { name, code, level, departmentId, durationYears: Number(durationYears), description: description || undefined });
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to create program');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-semibold mb-3">Create Program</h3>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Name</div>
          <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Code</div>
          <input value={code} onChange={e => setCode(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Level</div>
          <select value={level} onChange={e => setLevel(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded">
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Duration (years)</div>
          <input type="number" value={durationYears as any} onChange={e => setDurationYears(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <label className="block mb-4">
          <div className="text-sm text-gray-600">Description</div>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          <button disabled={loading} type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">{loading ? 'Creating...' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}
