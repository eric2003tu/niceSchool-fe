"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import Link from 'next/link';

const ExamsPage: React.FC = () => {
	const params = useParams() as { id?: string };
	const courseId = params?.id;

	const [exams, setExams] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!courseId) return;
		const load = async () => {
			try {
				setLoading(true);
				const res = await api.get(`/courses/${courseId}/exams`);
				setExams(extractList(res.data));
			} catch (err: any) {
				console.error('Failed to load exams', err);
				setError(err?.message || 'Failed to load exams');
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [courseId]);

	if (!courseId) return <div>No course selected</div>;
	if (loading) return <div>Loading exams...</div>;
	if (error) return <div className="text-red-600">{error}</div>;

	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Exams</h2>
				<Link href={`./create-exam`} className="text-emerald-600">Create Exam</Link>
			</div>

			{exams.length === 0 ? (
				<p>No exams yet.</p>
			) : (
				<ul className="space-y-2">
					{exams.map(e => (
						<li key={e.id || e._id} className="p-3 border rounded">
							<strong>{e.title}</strong>
							<p className="text-sm text-gray-600">Date: {e.date ? new Date(e.date).toLocaleDateString() : 'TBD'}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ExamsPage;
