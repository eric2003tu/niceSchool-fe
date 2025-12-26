"use client";

import { useState, useEffect } from 'react';
import { Clock, FileText, Mail, Phone, Home, User, Calendar, BookOpen, Flag, Check, X, Clock4, Loader2, ChevronDown, ChevronUp, ExternalLink, Award, GraduationCap, CheckCircle, AlertCircle, CalendarDays, FileCheck, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

interface Application {
  id: string;
  applicantId: string;
  program: string;
  academicYear: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'INTERVIEW_SCHEDULED' | 'ADMITTED' | 'CONDITIONALLY_ADMITTED' | 'WAITLISTED' | 'REJECTED' | 'WITHDRAWN';
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

// Enhanced status configuration with emojis and better descriptions
const statusConfig = {
  DRAFT: {
    color: 'bg-gray-100 text-gray-800',
    icon: <FileText className="w-4 h-4" />,
    emoji: '📝',
    description: 'Still editing',
    badgeColor: 'border-gray-300 bg-gray-50'
  },
  SUBMITTED: {
    color: 'bg-blue-50 text-blue-700',
    icon: <CheckCircle className="w-4 h-4" />,
    emoji: '📤',
    description: 'Application submitted',
    badgeColor: 'border-blue-200 bg-blue-50'
  },
  UNDER_REVIEW: {
    color: 'bg-purple-50 text-purple-700',
    icon: <Loader2 className="w-4 h-4 animate-spin" />,
    emoji: '🔍',
    description: 'Under review',
    badgeColor: 'border-purple-200 bg-purple-50'
  },
  INTERVIEW_SCHEDULED: {
    color: 'bg-indigo-50 text-indigo-700',
    icon: <CalendarDays className="w-4 h-4" />,
    emoji: '🗓️',
    description: 'Interview scheduled',
    badgeColor: 'border-indigo-200 bg-indigo-50'
  },
  ADMITTED: {
    color: 'bg-green-50 text-green-700',
    icon: <Award className="w-4 h-4" />,
    emoji: '🎉',
    description: 'Congratulations! Admitted',
    badgeColor: 'border-green-200 bg-green-50'
  },
  CONDITIONALLY_ADMITTED: {
    color: 'bg-emerald-50 text-emerald-700',
    icon: <CheckCircle className="w-4 h-4" />,
    emoji: '✅',
    description: 'Conditionally admitted',
    badgeColor: 'border-emerald-200 bg-emerald-50'
  },
  WAITLISTED: {
    color: 'bg-amber-50 text-amber-700',
    icon: <Clock className="w-4 h-4" />,
    emoji: '⏳',
    description: 'On waitlist',
    badgeColor: 'border-amber-200 bg-amber-50'
  },
  REJECTED: {
    color: 'bg-red-50 text-red-700',
    icon: <X className="w-4 h-4" />,
    emoji: '😔',
    description: 'Not admitted',
    badgeColor: 'border-red-200 bg-red-50'
  },
  WITHDRAWN: {
    color: 'bg-gray-100 text-gray-600',
    icon: <X className="w-4 h-4" />,
    emoji: '↩️',
    description: 'Application withdrawn',
    badgeColor: 'border-gray-200 bg-gray-50'
  }
};

// Priority order for status display (if needed)
const statusPriority = {
  ADMITTED: 1,
  CONDITIONALLY_ADMITTED: 2,
  INTERVIEW_SCHEDULED: 3,
  UNDER_REVIEW: 4,
  WAITLISTED: 5,
  SUBMITTED: 6,
  DRAFT: 7,
  REJECTED: 8,
  WITHDRAWN: 9
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
        setApplications(payload);
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgramName = (program: any) => {
    if (typeof program === 'object' && program !== null) {
      return program.name || program.title || program.code || 'Unnamed Program';
    }
    return program || 'Unnamed Program';
  };

  // Sort applications by status priority
  const sortedApplications = [...applications].sort((a, b) => {
    return (statusPriority[a.status] || 10) - (statusPriority[b.status] || 10);
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading your applications... 📚</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Oops! Something went wrong 😓</h3>
            <p className="mt-1 text-gray-600">Error loading applications: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              Try Again 🔄
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="mx-auto w-28 h-28 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No applications yet! ✨</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-2">You haven't submitted any applications yet. Ready to begin your journey?</p>
        <p className="text-sm text-gray-500 mb-8">Your future starts with one application 🚀</p>
        <button
          onClick={() => router.push('/apply')}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <FileText className="w-5 h-5 mr-2" />
          Start New Application
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-blue-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <GraduationCap className="w-8 h-8 mr-3 text-emerald-600" />
              My Applications
            </h1>
            <p className="text-gray-600">
              Track your application journey 📊 • {applications.length} application{applications.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => router.push('/apply')}
              className="px-5 py-2.5 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-medium rounded-xl transition-all shadow-sm hover:shadow-md flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              New Application
            </button>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-5">
        {sortedApplications.map((app) => {
          const config = statusConfig[app.status];
          return (
            <div key={app.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
              {/* Application Header */}
              <div 
                className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => toggleExpand(app.id)}
              >
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-3 sm:mb-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                          <GraduationCap className="w-5 h-5 text-emerald-700" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{getProgramName(app.program)}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-3 py-1 text-sm rounded-full border ${config.badgeColor} flex items-center space-x-2`}>
                              <span className="text-base">{config.emoji}</span>
                              <span className="font-medium">{app.status.replace('_', ' ')}</span>
                              {config.icon}
                            </span>
                            <span className="text-sm text-gray-500">• {config.description}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        📅 {app.academicYear} Academic Year
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted: {formatDate(app.submittedAt || app.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  {expandedApp === app.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedApp === app.id && (
                <div className="border-t border-gray-100 p-5 bg-gradient-to-b from-gray-50/50 to-white">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Information Card */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-emerald-700" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg">Personal Information 👤</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-gray-50/50 rounded-lg">
                          <Mail className="w-4 h-4 mr-3 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium">{app.personalInfo.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50/50 rounded-lg">
                          <Phone className="w-4 h-4 mr-3 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="font-medium">{app.personalInfo.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50/50 rounded-lg">
                          <Home className="w-4 h-4 mr-3 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Address</p>
                            <p className="font-medium">{app.personalInfo.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50/50 rounded-lg">
                          <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Date of Birth</p>
                            <p className="font-medium">{new Date(app.personalInfo.dateOfBirth).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50/50 rounded-lg">
                          <Flag className="w-4 h-4 mr-3 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Nationality</p>
                            <p className="font-medium">{app.personalInfo.nationality}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Academic Information Card */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <BookOpen className="w-5 h-5 text-blue-700" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg">Academic Information 🎓</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">Institution</p>
                            <p className="font-medium">{app.academicInfo.institution}</p>
                          </div>
                          <div className="bg-blue-50/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">Graduation Year</p>
                            <p className="font-medium">{app.academicInfo.graduationYear}</p>
                          </div>
                        </div>
                        <div className="bg-blue-50/50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Previous Education</p>
                          <p className="font-medium">{app.academicInfo.previousEducation}</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-500">GPA Score</p>
                              <p className="text-2xl font-bold text-gray-900">{app.academicInfo.gpa.toFixed(1)}</p>
                            </div>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents Card */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <FileCheck className="w-5 h-5 text-purple-700" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg">Documents 📄</h4>
                      </div>
                      <div className="space-y-3">
                        {Object.entries(app.documents).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 bg-purple-50/50 rounded-lg hover:bg-purple-50 transition-colors">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-3 text-purple-600" />
                              <div>
                                <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              </div>
                            </div>
                            <a 
                              href={value} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 text-sm font-medium rounded-lg transition-colors flex items-center shadow-sm"
                            >
                              View <ExternalLink className="w-3 h-3 ml-1.5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personal Statement & Admin Notes Card */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                      <div className="space-y-5">
                        <div>
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                              <FileText className="w-5 h-5 text-amber-700" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg">Personal Statement ✍️</h4>
                          </div>
                          <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
                            <p className="text-gray-700 whitespace-pre-line">{app.personalStatement}</p>
                          </div>
                        </div>

                        {app.adminNotes && (
                          <div>
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                <AlertCircle className="w-5 h-5 text-gray-700" />
                              </div>
                              <h4 className="font-bold text-gray-900 text-lg">Admin Notes 📋</h4>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <p className="text-gray-700">{app.adminNotes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center mb-3 sm:mb-0">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <Calendar className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Application Timeline</p>
                          <p>Created: {formatDate(app.createdAt)}</p>
                          {app.reviewedAt && <p>Reviewed: {formatDate(app.reviewedAt)}</p>}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-4 py-2 rounded-lg font-medium flex items-center ${config.color}`}>
                          {config.emoji} Current Status: {app.status.replace('_', ' ')}
                        </span>
                        {app.status === 'ADMITTED' && (
                          <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all">
                            Accept Offer 🎓
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Applications Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-emerald-600" />
          Applications Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = applications.filter(app => app.status === status).length;
            if (count === 0) return null;
            
            return (
              <div key={status} className={`p-4 rounded-xl border ${config.badgeColor} text-center`}>
                <div className="text-2xl font-bold text-gray-900 mb-1">{count}</div>
                <div className="flex items-center justify-center space-x-2">
                  <span>{config.emoji}</span>
                  <span className="text-sm font-medium">{status.replace('_', ' ')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}