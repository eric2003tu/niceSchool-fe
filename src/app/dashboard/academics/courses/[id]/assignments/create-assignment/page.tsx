"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';

const CreateAssignmentPage: React.FC = () => {
  const params = useParams() as { id?: string };
  const courseId = params?.id;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return alert('Missing course id');
    try {
      setLoading(true);
      const form = new FormData();
      form.append('title', title);
      form.append('description', description);
      form.append('dueDate', dueDate);
      if (file) form.append('file', file);

      const res = await api.post(`/courses/${courseId}/assignments`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.status === 201 || res.status === 200) {
        router.push(`../`);
      } else {
        alert('Failed to create assignment');
      }
    } catch (err: any) {
      console.error('Create assignment error', err);
      alert(err?.response?.data?.message || err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Create Assignment</h2>
      <label className="block">
        <span className="text-sm font-medium">Title</span>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border mt-1" />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Description</span>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border mt-1" />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Due date</span>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="p-2 border mt-1" aria-label="Due date" />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Attachment (optional)</span>
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} aria-label="Assignment attachment" className="mt-1" />
      </label>

      <button type="submit" disabled={loading} className="bg-emerald-600 text-white px-4 py-2 rounded">
        {loading ? 'Creating...' : 'Create Assignment'}
      </button>
    </form>
  );
};

export default CreateAssignmentPage;