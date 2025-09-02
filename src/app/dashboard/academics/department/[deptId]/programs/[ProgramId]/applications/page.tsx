import React from 'react';
import ApplicationsList from '@/components/application-component/ApplicationsList';
import AnalyticsRow from '@/components/application-component/ApplicationsAnalyticsRow';

interface Props { params: { deptId: string; ProgramId: string } }

export default function Page({ params }: Props) {
  const { ProgramId } = params;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Applications for Program</h1>
      <AnalyticsRow filter={{ program: ProgramId }} />
      <ApplicationsList filter={{ program: ProgramId }} />
    </div>
  );
}
