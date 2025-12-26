"use client";

import { useState, useEffect } from 'react';
import { 
  FileText, Mail, Phone, Home, User, Calendar, 
  BookOpen, Flag, Check, X, Clock, Loader2, 
  ChevronDown, ChevronUp, Eye, CalendarDays,
  Award, ListChecks, UserX, RefreshCw,
  GraduationCap, ClipboardCheck, Clock4,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

interface Application {
  id: string;
  applicantId: string;
  program: string;
  academicYear: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'INTERVIEW_SCHEDULED' | 
          'ADMITTED' | 'CONDITIONALLY_ADMITTED' | 'WAITLISTED' | 
          'REJECTED' | 'WITHDRAWN';
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

const statusConfig = {
  DRAFT: {
    color: 'bg-gray-100 text-gray-800',
    icon: <FileText className="w-4 h-4" />,
    label: 'Draft',
    description: 'Application not yet submitted'
  },
  SUBMITTED: {
    color: 'bg-blue-50 text-blue-700 border border-blue-200',
    icon: <Check className="w-4 h-4" />,
    label: 'Submitted',
    description: 'Application received'
  },
  UNDER_REVIEW: {
    color: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    icon: <Loader2 className="w-4 h-4 animate-spin" />,
    label: 'Under Review',
    description: 'Being reviewed by admissions'
  },
  INTERVIEW_SCHEDULED: {
    color: 'bg-purple-50 text-purple-700 border border-purple-200',
    icon: <CalendarDays className="w-4 h-4" />,
    label: 'Interview Scheduled',
    description: 'Interview has been scheduled'
  },
  ADMITTED: {
    color: 'bg-green-50 text-green-700 border border-green-200',
    icon: <Award className="w-4 h-4" />,
    label: 'Admitted',
    description: 'Congratulations! You\'ve been accepted'
  },
  CONDITIONALLY_ADMITTED: {
    color: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    icon: <ClipboardCheck className="w-4 h-4" />,
    label: 'Conditionally Admitted',
    description: 'Admitted with conditions'
  },
  WAITLISTED: {
    color: 'bg-amber-50 text-amber-700 border border-amber-200',
    icon: <ListChecks className="w-4 h-4" />,
    label: 'Waitlisted',
    description: 'Placed on waitlist'
  },
  REJECTED: {
    color: 'bg-red-50 text-red-700 border border-red-200',
    icon: <X className="w-4 h-4" />,
    label: 'Not Admitted',
    description: 'Application not successful'
  },
  WITHDRAWN: {
    color: 'bg-gray-100 text-gray-600 border border-gray-300',
    icon: <UserX className="w-4 h-4" />,
    label: 'Withdrawn',
    description: 'Application withdrawn'
  }
};

const statusOrder = {
  'DRAFT': 1,
  'SUBMITTED': 2,
  'UNDER_REVIEW': 3,
  'INTERVIEW_SCHEDULED': 4,
  'ADMITTED': 5,
  'CONDITIONALLY_ADMITTED': 6,
  'WAITLISTED': 7,
  'REJECTED': 8,
  'WITHDRAWN': 9
};

const statusProgress = {
  'DRAFT': 10,
  'SUBMITTED': 30,
  'UNDER_REVIEW': 50,
  'INTERVIEW_SCHEDULED': 70,
  'ADMITTED': 100,
  'CONDITIONALLY_ADMITTED': 100,
  'WAITLISTED': 80,
  'REJECTED': 100,
  'WITHDRAWN': 100
};

export default function MyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/admissions/my-applications');
        const payload = res?.data?.data ?? res?.data ?? [];
        // Sort applications by status order and then by date
        const sortedApps = payload.sort((a: Application, b: Application) => {
          if (statusOrder[a.status] !== statusOrder[b.status]) {
            return statusOrder[a.status] - statusOrder[b.status];
          }
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setApplications(sortedApps);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  const toggleExpand = (id: string) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not submitted';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgramName = (program: any) => {
    if (typeof program === 'object' && program !== null) {
      return program.name || program.title || program.code || 'Unknown Program';
    }
    return program;
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading your applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-sm border border-red-100">
        <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-full mx-auto mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">Unable to Load Applications</h3>
        <p className="text-gray-600 text-center mb-4">{error}</p>
        <div className="flex gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <button 
            onClick={() => router.push('/apply')}
            className="flex-1 px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
          >
            Start New
          </button>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <GraduationCap className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You haven't submitted any applications. Start your journey by creating your first application.
        </p>
        <button
          onClick={() => router.push('/apply')}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-medium shadow-sm hover:shadow transition-all duration-200"
        >
          <FileText className="w-5 h-5 mr-2" />
          Start New Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">Track the status of all your submitted applications</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => !['REJECTED', 'WITHDRAWN'].includes(app.status)).length}
              </p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Loader2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admitted</p>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => ['ADMITTED', 'CONDITIONALLY_ADMITTED'].includes(app.status)).length}
              </p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Latest Update</p>
              <p className="text-sm font-medium text-gray-900">
                {applications.length > 0 ? formatDate(applications[0].updatedAt).split(',')[0] : 'N/A'}
              </p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {applications.map((app) => {
          const config = statusConfig[app.status];
          const progress = statusProgress[app.status];
          
          return (
            <div key={app.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Application Header */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleExpand(app.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {getProgramName(app.program)}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${config.color} flex items-center gap-1.5`}>
                            {config.icon}
                            <span>{config.label}</span>
                          </span>
                          <span className="text-sm text-gray-500">
                            {app.academicYear} • {formatDate(app.submittedAt || app.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{config.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      {expandedApp === app.id ? 'Show less' : 'View details'}
                    </span>
                    {expandedApp === app.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Application Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedApp === app.id && (
                <div className="border-t border-gray-100">
                  <div className="p-6 bg-gray-50/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-8">
                        {/* Personal Information Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                              <User className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Personal Information</h4>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-gray-900">{app.personalInfo.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="text-gray-900">{app.personalInfo.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Home className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="text-gray-900">{app.personalInfo.address}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Date of Birth</p>
                                <p className="text-gray-900">
                                  {new Date(app.personalInfo.dateOfBirth).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Flag className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Nationality</p>
                                <p className="text-gray-900">{app.personalInfo.nationality}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Academic Information Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Academic Information</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Institution</p>
                              <p className="font-medium text-gray-900">{app.academicInfo.institution}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Graduation Year</p>
                              <p className="font-medium text-gray-900">{app.academicInfo.graduationYear}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">Previous Education</p>
                              <p className="font-medium text-gray-900">{app.academicInfo.previousEducation}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">GPA</p>
                              <div className="flex items-center gap-2">
                                <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                    style={{ width: `${(app.academicInfo.gpa / 4.0) * 100}%` }}
                                  />
                                </div>
                                <span className="font-bold text-gray-900">{app.academicInfo.gpa.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-8">
                        {/* Documents Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-purple-50 rounded-lg">
                              <FileText className="w-5 h-5 text-purple-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900">Documents</h4>
                          </div>
                          <div className="space-y-3">
                            {Object.entries(app.documents).map(([key, url]) => (
                              <a
                                key={key}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200">
                                    <Eye className="w-4 h-4 text-gray-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 capitalize">
                                      {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </p>
                                  </div>
                                </div>
                                <ChevronDown className="w-5 h-5 text-gray-400 transform -rotate-90" />
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Personal Statement & Admin Notes */}
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                            <h4 className="font-semibold text-gray-900 mb-3">Personal Statement</h4>
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <p className="text-gray-700 leading-relaxed">{app.personalStatement}</p>
                            </div>
                          </div>

                          {app.adminNotes && (
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 shadow-sm">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                  <AlertCircle className="w-5 h-5 text-amber-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900">Admissions Notes</h4>
                              </div>
                              <div className="p-4 bg-white/50 rounded-lg border border-amber-100">
                                <p className="text-gray-700 leading-relaxed">{app.adminNotes}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="text-sm text-gray-600">
                          <p><span className="font-medium">Application ID:</span> {app.id.slice(0, 8)}</p>
                        </div>
                        <div className="flex gap-6 text-sm text-gray-500">
                          <div>
                            <p className="font-medium text-gray-700">Submitted</p>
                            <p>{formatDate(app.submittedAt)}</p>
                          </div>
                          {app.reviewedAt && (
                            <div>
                              <p className="font-medium text-gray-700">Last Reviewed</p>
                              <p>{formatDate(app.reviewedAt)}</p>
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-700">Updated</p>
                            <p>{formatDate(app.updatedAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Help Text */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          Need help? Contact the admissions office at{" "}
          <a href="mailto:admissions@university.edu" className="text-emerald-600 hover:underline">
            admissions@university.edu
          </a>
        </p>
      </div>
    </div>
  );
}