"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api, { extractList } from '@/lib/api';
import AddCohortModal from '@/components/academics/AddCohortModal';

export default function ProgramCohortsPage() {
	const params = useParams() as { deptId?: string; ProgramId?: string };
	const programId = params?.ProgramId;

	const [cohorts, setCohorts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showAdd, setShowAdd] = useState(false);

	useEffect(() => {
		if (!programId) return;
		const load = async () => {
			try {
				setLoading(true);
				const res = await api.get(`/academics/programs/${programId}/cohorts`);
				setCohorts(extractList(res.data));
			} catch (err: any) {
				setError(err?.response?.data?.message || err?.message || 'Failed to load cohorts');
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [programId]);

	if (!programId) return <div>No program selected</div>;
	if (loading) return <div>Loading cohorts...</div>;
	if (error) return <div className="text-red-600">{error}</div>;

	return (
		<div>
			<AddCohortModal open={showAdd} onClose={() => setShowAdd(false)} programId={programId} />
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Cohorts</h2>
				<div>
					<button onClick={() => setShowAdd(true)} className="px-3 py-2 bg-emerald-600 text-white rounded-md">+ New Cohort</button>
				</div>
			</div>

			<div className="grid gap-3">
				{cohorts.map(c => (
					<div key={c.id} className="p-3 border rounded">
						<div className="font-semibold">{c.name}</div>
						<div className="text-sm text-gray-600">Intake: {c.intakeYear}</div>
					</div>
				))}
				{cohorts.length === 0 && <div className="text-gray-600">No cohorts found</div>}
			</div>
		</div>
	);
}
