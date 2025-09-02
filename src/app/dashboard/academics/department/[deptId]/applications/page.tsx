import React from 'react';
import ApplicationsList from '@/components/application-component/ApplicationsList';
import AnalyticsRow from '@/components/application-component/ApplicationsAnalyticsRow';

interface Props { params: { deptId: string } }

export default async function Page({ params }: Props) {
  const { deptId } = params;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Applications for Department</h1>
      <AnalyticsRow filter={{ department: deptId }} />
      <ApplicationsList filter={{ department: deptId }} />
    </div>
  );
}
