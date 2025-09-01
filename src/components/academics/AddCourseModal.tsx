"use client";
import React, { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

type Props = {
  open: boolean;
  onClose: () => void;
  programId?: string;
  departmentId?: string;
};

export default function AddCourseModal({ open, onClose, programId, departmentId }: Props) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [credits, setCredits] = useState<number | ''>('');
  const [semester, setSemester] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!code || !title) {
      setError('Code and title are required');
      return;
    }
    try {
      setLoading(true);
      await api.post('/academics/courses', { code, title, description: description || undefined, credits: credits === '' ? undefined : Number(credits), programId, departmentId, semester: semester || undefined });
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-lg p-6 shadow">
        <h3 className="text-lg font-semibold mb-3">Create Course</h3>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Code</div>
          <input value={code} onChange={e => setCode(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Title</div>
          <input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Credits (optional)</div>
          <input type="number" value={credits as any} onChange={e => setCredits(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 w-full px-3 py-2 border rounded" />
        </label>
        <label className="block mb-2">
          <div className="text-sm text-gray-600">Semester (optional)</div>
          <input value={semester} onChange={e => setSemester(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" />
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
