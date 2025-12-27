"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { 
  XCircle, 
  Check, 
  User, 
  Mail, 
  Phone, 
  Home, 
  Calendar, 
  Flag, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Award, 
  Clock, 
  AlertCircle,
  Download,
  Eye,
  Edit,
  ChevronRight,
  Building,
  School,
  BarChart3,
  ShieldCheck,
  MessageSquare,
  Send,
  ArrowLeft,
  MoreVertical
} from "lucide-react";
import BackButton from "@/components/ui/BackButton";

// Enhanced status configuration with better colors and icons
const statusConfig = {
  DRAFT: {
    color: "bg-gray-100 text-gray-800",
    border: "border-gray-300",
    icon: <FileText className="w-4 h-4" />,
    badge: "border-gray-300 bg-gray-50"
  },
  SUBMITTED: {
    color: "bg-blue-50 text-blue-700",
    border: "border-blue-200",
    icon: <Send className="w-4 h-4" />,
    badge: "border-blue-200 bg-blue-50"
  },
  UNDER_REVIEW: {
    color: "bg-purple-50 text-purple-700",
    border: "border-purple-200",
    icon: <Eye className="w-4 h-4" />,
    badge: "border-purple-200 bg-purple-50"
  },
  INTERVIEW_SCHEDULED: {
    color: "bg-indigo-50 text-indigo-700",
    border: "border-indigo-200",
    icon: <Calendar className="w-4 h-4" />,
    badge: "border-indigo-200 bg-indigo-50"
  },
  ADMITTED: {
    color: "bg-gradient-to-r from-green-50 to-emerald-50 text-green-800",
    border: "border-green-200",
    icon: <Award className="w-4 h-4" />,
    badge: "border-green-200 bg-green-50"
  },
  CONDITIONALLY_ADMITTED: {
    color: "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800",
    border: "border-emerald-200",
    icon: <ShieldCheck className="w-4 h-4" />,
    badge: "border-emerald-200 bg-emerald-50"
  },
  WAITLISTED: {
    color: "bg-amber-50 text-amber-800",
    border: "border-amber-200",
    icon: <Clock className="w-4 h-4" />,
    badge: "border-amber-200 bg-amber-50"
  },
  REJECTED: {
    color: "bg-red-50 text-red-800",
    border: "border-red-200",
    icon: <XCircle className="w-4 h-4" />,
    badge: "border-red-200 bg-red-50"
  },
  WITHDRAWN: {
    color: "bg-gray-100 text-gray-600",
    border: "border-gray-300",
    icon: <XCircle className="w-4 h-4" />,
    badge: "border-gray-300 bg-gray-50"
  }
};

// Status options for dropdown
const statusOptions = [
  { value: "SUBMITTED", label: "Submitted", color: "text-blue-600", icon: <Send className="w-4 h-4" /> },
  { value: "UNDER_REVIEW", label: "Under Review", color: "text-purple-600", icon: <Eye className="w-4 h-4" /> },
  { value: "INTERVIEW_SCHEDULED", label: "Interview Scheduled", color: "text-indigo-600", icon: <Calendar className="w-4 h-4" /> },
  { value: "ADMITTED", label: "Admit", color: "text-green-600", icon: <Award className="w-4 h-4" /> },
  { value: "CONDITIONALLY_ADMITTED", label: "Conditionally Admit", color: "text-emerald-600", icon: <ShieldCheck className="w-4 h-4" /> },
  { value: "WAITLISTED", label: "Waitlist", color: "text-amber-600", icon: <Clock className="w-4 h-4" /> },
  { value: "REJECTED", label: "Reject", color: "text-red-600", icon: <XCircle className="w-4 h-4" /> },
  { value: "WITHDRAWN", label: "Mark as Withdrawn", color: "text-gray-600", icon: <XCircle className="w-4 h-4" /> }
];

export default function ApplicationDetailPage() {
  const { deptId, id } = useParams();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const role = (() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      return raw ? JSON.parse(raw).role || "" : "";
    } catch (e) {
      return "";
    }
  })();
  const canManage = role === "ADMIN" || role === "FACULTY";

  useEffect(() => {
    async function fetchApplication() {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/admissions/applications/${id}`);
        setApplication(res.data);
      } catch (e) {
        setError("Failed to load application details");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchApplication();
  }, [id]);

  const handleChangeStatus = async (status: string) => {
    if (!canManage) return;
    setLoading(true);
    try {
      await api.patch(`/admissions/applications/${id}/status`, { status, adminNotes: notes });
      setApplication((prev: any) => ({ ...prev, status }));
      setShowStatusDropdown(false);
    } catch (e) {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading application details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Failed to Load Application</h3>
            <p className="mt-1 text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!application) return null;

  const config = statusConfig[application.status as keyof typeof statusConfig] || statusConfig.SUBMITTED;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header with breadcrumbs and actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <BackButton />
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
              <span>Admissions</span>
              <ChevronRight className="w-4 h-4" />
              <span>Applications</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">#{application.id?.slice(0, 8)}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Application Review</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 rounded-full border ${config.badge} flex items-center space-x-2 font-medium`}>
            {config.icon}
            <span>{application.status?.replace('_', ' ') || 'Unknown'}</span>
          </span>
          
          {canManage && (
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Change Status</span>
              </button>
              
              {showStatusDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleChangeStatus(option.value)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    >
                      <span className={option.color}>{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Applicant Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <img 
                    src={application.applicant?.profileImage || "/public/person-m-3.webp"} 
                    alt="applicant" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {application.personalInfo?.firstName} {application.personalInfo?.lastName}
                </h2>
                <p className="text-sm text-gray-600 mt-1 flex items-center">
                  <Mail className="w-4 h-4 mr-1.5" />
                  {application.applicant?.email}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 space-y-6">
              <div>
                <div className="text-xs text-gray-500 mb-2">Application ID</div>
                <div className="font-mono text-sm font-medium bg-gray-50 px-3 py-2 rounded-lg">
                  {application.id?.slice(0, 12)}...
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl">
                  <div>
                    <div className="text-xs text-gray-500">Academic Year</div>
                    <div className="font-bold text-lg">{application.academicYear}</div>
                  </div>
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl">
                  <div>
                    <div className="text-xs text-gray-500">Applied On</div>
                    <div className="font-medium">{formatDate(application.createdAt)}</div>
                  </div>
                  <Calendar className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              {/* Contact Info */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {application.personalInfo?.phone || "—"}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Home className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{application.personalInfo?.address || "—"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Notes Section */}
          {canManage && (
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-emerald-600" />
                Admin Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this application..."
                className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all h-40 resize-none"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleChangeStatus(application.status)}
                  className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Application Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Program</div>
                  <div className="text-xl font-bold text-gray-900">{application.program?.name || application.programId}</div>
                  <div className="text-sm text-gray-600 mt-1">{application.program?.code}</div>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Course</div>
                  <div className="text-xl font-bold text-gray-900">{application.course?.title || application.course?.name || application.courseId}</div>
                  <div className="text-sm text-gray-600 mt-1">{application.course?.code} • {application.course?.credits} credits</div>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Academic Status</div>
                  <div className="text-xl font-bold text-gray-900">{application.academicInfo?.gpa || "—"} GPA</div>
                  <div className="text-sm text-gray-600 mt-1">{application.academicInfo?.institution}</div>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-1 px-6">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                    activeTab === "overview"
                      ? "text-emerald-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Overview
                  {activeTab === "overview" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("documents")}
                  className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                    activeTab === "documents"
                      ? "text-emerald-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Documents
                  {activeTab === "documents" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`px-4 py-3 font-medium text-sm transition-colors relative ${
                    activeTab === "personal"
                      ? "text-emerald-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Personal Statement
                  {activeTab === "personal" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-emerald-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Email Address</div>
                          <div className="font-medium flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {application.personalInfo?.email}
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Phone Number</div>
                          <div className="font-medium flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {application.personalInfo?.phone}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Date of Birth</div>
                          <div className="font-medium flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {application.personalInfo?.dateOfBirth 
                              ? new Date(application.personalInfo.dateOfBirth).toLocaleDateString()
                              : "—"}
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Nationality</div>
                          <div className="font-medium flex items-center">
                            <Flag className="w-4 h-4 mr-2 text-gray-400" />
                            {application.personalInfo?.nationality}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Address</div>
                      <div className="font-medium flex items-center">
                        <Home className="w-4 h-4 mr-2 text-gray-400" />
                        {application.personalInfo?.address}
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="bg-gray-50/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <School className="w-5 h-5 mr-2 text-emerald-600" />
                      Academic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Institution</div>
                          <div className="font-medium flex items-center">
                            <Building className="w-4 h-4 mr-2 text-gray-400" />
                            {application.academicInfo?.institution}
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Graduation Year</div>
                          <div className="font-bold text-lg">{application.academicInfo?.graduationYear}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="text-xs text-gray-500 mb-1">Previous Education</div>
                          <div className="font-medium">{application.academicInfo?.previousEducation}</div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-100">
                          <div className="text-xs text-gray-500 mb-1">GPA Score</div>
                          <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-gray-900">{application.academicInfo?.gpa}</div>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                              <BarChart3 className="w-6 h-6 text-emerald-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {application.documents?.idDocument && (
                      <div className="group p-6 border border-gray-200 rounded-2xl hover:border-emerald-300 hover:shadow-md transition-all bg-white">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">ID Document</div>
                            <div className="text-xs text-gray-500 mt-1">Government issued identification</div>
                          </div>
                          <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                            <FileText className="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                        <a 
                          href={application.documents.idDocument} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Document
                        </a>
                      </div>
                    )}

                    {application.documents?.transcript && (
                      <div className="group p-6 border border-gray-200 rounded-2xl hover:border-emerald-300 hover:shadow-md transition-all bg-white">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">Academic Transcript</div>
                            <div className="text-xs text-gray-500 mt-1">Official academic records</div>
                          </div>
                          <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <a 
                          href={application.documents.transcript} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-xl transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Transcript
                        </a>
                      </div>
                    )}

                    {application.documents?.personalStatement && (
                      <div className="group p-6 border border-gray-200 rounded-2xl hover:border-emerald-300 hover:shadow-md transition-all bg-white">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">Personal Statement</div>
                            <div className="text-xs text-gray-500 mt-1">Applicant's personal essay</div>
                          </div>
                          <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                            <FileText className="w-5 h-5 text-purple-600" />
                          </div>
                        </div>
                        <a 
                          href={application.documents.personalStatement} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium rounded-xl transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Statement
                        </a>
                      </div>
                    )}

                    {application.documents?.recommendationLetter && (
                      <div className="group p-6 border border-gray-200 rounded-2xl hover:border-emerald-300 hover:shadow-md transition-all bg-white">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">Recommendation Letter</div>
                            <div className="text-xs text-gray-500 mt-1">Professional recommendation</div>
                          </div>
                          <div className="p-3 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors">
                            <FileText className="w-5 h-5 text-amber-600" />
                          </div>
                        </div>
                        <a 
                          href={application.documents.recommendationLetter} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-xl transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Letter
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "personal" && application.personalStatement && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Statement</h3>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {application.personalStatement}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          {canManage && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleChangeStatus("ADMITTED")}
                  className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <Award className="w-5 h-5" />
                  <span>Admit Applicant</span>
                </button>
                <button
                  onClick={() => handleChangeStatus("REJECTED")}
                  className="px-5 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Reject Application</span>
                </button>
                <button
                  onClick={() => handleChangeStatus("INTERVIEW_SCHEDULED")}
                  className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Interview</span>
                </button>
                <button
                  onClick={() => handleChangeStatus("WAITLISTED")}
                  className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <Clock className="w-5 h-5" />
                  <span>Move to Waitlist</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}