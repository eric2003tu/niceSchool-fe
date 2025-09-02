import React from 'react';
import ApplicationsList from '@/components/application-component/ApplicationsList';
import AnalyticsRow from '@/components/application-component/ApplicationsAnalyticsRow';

interface Props { params: { id: string } }

export default function Page({ params }: Props) {
  const { id } = params;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Applications for Course</h1>
      <AnalyticsRow filter={{ course: id }} />
      <ApplicationsList filter={{ course: id }} />
    </div>
  );
}
