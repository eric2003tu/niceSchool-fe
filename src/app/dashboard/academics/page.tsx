"use client";
import React from 'react';
import Link from 'next/link';

const AcademicsLanding: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Academics</h1>
      <p className="mb-4">Quick links to academic sections</p>
      <ul className="space-y-2">
        <li><Link href="/dashboard/academics/department" className="text-emerald-600">Departments</Link></li>
        <li><Link href="/dashboard/academics/programs" className="text-emerald-600">Programs</Link></li>
        <li><Link href="/dashboard/courses" className="text-emerald-600">All Courses</Link></li>
        <li><Link href="/dashboard/academics/cohorts" className="text-emerald-600">Cohorts</Link></li>
      </ul>
    </div>
  );
};

export default AcademicsLanding;
