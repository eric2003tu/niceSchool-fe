"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';

const CreateExamPage: React.FC = () => {
  const params = useParams() as { id?: string };
  const courseId = params?.id;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return alert('Missing course id');
    try {
      setLoading(true);
      const res = await api.post(`/courses/${courseId}/exams`, { title, date, duration });
      if (res.status === 201 || res.status === 200) router.push('../');
      else alert('Failed to create exam');
    } catch (err: any) {
      console.error('Create exam error', err);
      alert(err?.response?.data?.message || err.message || 'Error');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Create Exam</h2>
      <label className="block">
        <span className="text-sm font-medium">Title</span>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Exam title" className="w-full p-2 border mt-1" />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Date</span>
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border mt-1" />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Duration (minutes)</span>
        <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-2 border mt-1" />
      </label>

      <button type="submit" disabled={loading} className="bg-emerald-600 text-white px-4 py-2 rounded">
        {loading ? 'Creating...' : 'Create Exam'}
      </button>
    </form>
  );
};

export default CreateExamPage;

