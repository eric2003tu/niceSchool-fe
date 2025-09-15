import React from 'react';
import ApplicationsList from '@/components/application-component/ApplicationsList';
import AnalyticsRow from '@/components/application-component/ApplicationsAnalyticsRow';
import BackButton from '@/components/ui/BackButton';

interface Props { params: { deptId: string; ProgramId: string } }

export default function Page({ params }: Props) {
  const { ProgramId } = params;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BackButton />
        <h1 className="text-2xl font-bold">Applications for Program</h1>
      </div>
      <AnalyticsRow filter={{ program: ProgramId }} />
      <ApplicationsList filter={{ program: ProgramId }} />
    </div>
  );
}
