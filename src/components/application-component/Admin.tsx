"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, FileText, Mail, Phone, Home, User, Calendar, BookOpen, Flag, Check, X, Clock4, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { ApplicationCRUD } from './ApplicationCRUD';

export interface Application {
  id: string;
  applicantId: string;
  program: string;
  academicYear: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  personalInfo: {
    email: string;
    phone: string;
    address: string;
    lastName: string;
    firstName: string;
    dateOfBirth: string;
    nationality: string;
  };
  academicInfo: {
    gpa: number;
    institution: string;
    graduationYear: number;
    previousEducation: string;
  };
  documents: {
    idDocument: string;
    transcript: string;
    personalStatement: string;
    recommendationLetter: string;
  };
  personalStatement: string;
  adminNotes: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  UNDER_REVIEW: 'bg-blue-100 text-blue-800'
};

const statusIcons = {
  PENDING: <Clock4 className="w-4 h-4" />,
  APPROVED: <Check className="w-4 h-4" />,
  REJECTED: <X className="w-4 h-4" />,
  UNDER_REVIEW: <Loader2 className="w-4 h-4 animate-spin" />
};

export default function Admin() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:3001/api/admissions/applications', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        setApplications(data.data); // Note: Changed to data.data to match your API response
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

const handleUpdateApplication = async (updatedApp: Application) => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch(`http://localhost:3001/api/admissions/applications/${updatedApp.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ status: updatedApp.status })
    });

    if (!response.ok) {
      throw new Error('Failed to update application');
    }

    setApplications(prev => prev.map(app => 
      app.id === updatedApp.id ? updatedApp : app
    ));
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to update application');
  }
};

  const handleDeleteApplication = async (id: string) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3001/api/admissions/applications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete application');
      }

      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete application');
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not submitted';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg text-red-700">
        <p>Error loading applications: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
        <p className="mt-1 text-gray-500">There are no applications to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
              <div 
                className="flex-1 flex justify-between items-center"
                onClick={() => toggleExpand(app.id)}
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{app.program}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[app.status]} flex items-center space-x-1`}>
                      {statusIcons[app.status]}
                      <span>{app.status.replace('_', ' ')}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {app.personalInfo.firstName} {app.personalInfo.lastName} • 
                    Applied for {app.academicYear} • {formatDate(app.submittedAt || app.createdAt)}
                  </p>
                </div>
                {expandedApp === app.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              <ApplicationCRUD 
                application={app} 
                onUpdate={handleUpdateApplication}
                onDelete={handleDeleteApplication}
              />
            </div>

            {expandedApp === app.id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2 text-emerald-600" />
                      Personal Information
                    </h4>
                    <div className="space-y-2">
                      <p className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {app.personalInfo.email}
                      </p>
                      <p className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {app.personalInfo.phone}
                      </p>
                      <p className="flex items-center text-sm">
                        <Home className="w-4 h-4 mr-2 text-gray-400" />
                        {app.personalInfo.address}
                      </p>
                      <p className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(app.personalInfo.dateOfBirth).toLocaleDateString()}
                      </p>
                      <p className="flex items-center text-sm">
                        <Flag className="w-4 h-4 mr-2 text-gray-400" />
                        {app.personalInfo.nationality}
                      </p>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                      Academic Information
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Institution:</span> {app.academicInfo.institution}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Graduation Year:</span> {app.academicInfo.graduationYear}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Previous Education:</span> {app.academicInfo.previousEducation}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">GPA:</span> {app.academicInfo.gpa.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                      Documents
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">ID Document:</span> 
                        <a href={app.documents.idDocument} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline ml-2">
                          View
                        </a>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Transcript:</span> 
                        <a href={app.documents.transcript} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline ml-2">
                          View
                        </a>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Personal Statement:</span> 
                        <a href={app.documents.personalStatement} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline ml-2">
                          View
                        </a>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Recommendation Letter:</span> 
                        <a href={app.documents.recommendationLetter} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline ml-2">
                          View
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Personal Statement & Admin Notes */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Personal Statement</h4>
                      <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
                        {app.personalStatement}
                      </p>
                    </div>

                    {app.adminNotes && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Admin Notes</h4>
                        <p className="text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
                          {app.adminNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                  <p>Created: {formatDate(app.createdAt)}</p>
                  {app.reviewedAt && <p>Reviewed: {formatDate(app.reviewedAt)}</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}