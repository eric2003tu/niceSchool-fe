import React from 'react';
import ApplicationsList from '@/components/application-component/ApplicationsList';
import AnalyticsRow from '@/components/application-component/ApplicationsAnalyticsRow';
import BackButton from '@/components/ui/BackButton';

interface Props { params: { id: string } }

export default function Page({ params }: Props) {
  const { id } = params;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BackButton />
        <h1 className="text-2xl font-bold">Applications for Course</h1>
      </div>
      <AnalyticsRow filter={{ course: id }} />
      <ApplicationsList filter={{ course: id }} />
    </div>
  );
}
