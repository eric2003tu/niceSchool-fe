"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { XCircle, Check } from "lucide-react";
import BackButton from "@/components/ui/BackButton";

// Copied and adapted from ApplicationDetailModal
export default function ApplicationDetailPage() {
  const { deptId, id } = useParams();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

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
    } catch (e) {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (s: string) => {
    switch (s) {
      case "ADMITTED":
      case "CONDITIONALLY_ADMITTED":
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Admitted</span>;
      case "REJECTED":
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">Rejected</span>;
      case "UNDER_REVIEW":
        return <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">Under Review</span>;
      case "SUBMITTED":
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Submitted</span>;
      case "DRAFT":
        return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Draft</span>;
      case "INTERVIEW_SCHEDULED":
        return <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs">Interview Scheduled</span>;
      case "WAITLISTED":
        return <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs">Waitlisted</span>;
      case "WITHDRAWN":
        return <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-500 text-xs">Withdrawn</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">{s}</span>;
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!application) return null;

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-start justify-between p-6 border-b">
          <div>
                  <div className="mb-4">
        <BackButton />
      </div>
            <h2 className="text-xl font-semibold">Application Details</h2>
            <p className="text-sm text-gray-500">{application.program?.name || application.programId}</p>
          </div>
          <div className="flex items-center space-x-3">{statusBadge(application.status)}</div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <img src={application.applicant?.profileImage || "/public/person-m-3.webp"} alt="applicant" className="w-28 h-28 rounded-full object-cover shadow-sm" />
            <h3 className="mt-3 font-semibold">{application.personalInfo?.firstName} {application.personalInfo?.lastName}</h3>
            <p className="text-sm text-gray-500">{application.applicant?.email}</p>
            <p className="text-sm text-gray-500 mt-2">Applied: {new Date(application.createdAt).toLocaleString()}</p>
            <div className="mt-4 space-y-2">
              <div className="text-sm text-gray-600">Academic Year</div>
              <div className="text-lg font-medium">{application.academicYear}</div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded">
                <div className="text-xs text-gray-500">Program</div>
                <div className="font-semibold mt-1">{application.program?.name || application.programId}</div>
                <div className="text-xs text-gray-400">{application.program?.code}</div>
              </div>
              <div className="p-4 border rounded">
                <div className="text-xs text-gray-500">Course</div>
                <div className="font-semibold mt-1">{application.course?.title || application.course?.name || application.courseId}</div>
                <div className="text-xs text-gray-400">{application.course?.code} • {application.course?.credits} credits</div>
              </div>
              <div className="p-4 border rounded">
                <div className="text-xs text-gray-500">Status</div>
                <div className="font-semibold mt-1">{application.status?.replace('_', ' ') || 'Unknown'}</div>
                <div className="text-xs text-gray-400">{application.submittedAt ? `Submitted: ${new Date(application.submittedAt).toLocaleString()}` : 'Not submitted'}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="text-sm font-medium mb-2">Personal Information</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><strong>Email:</strong> {application.personalInfo?.email}</div>
                  <div><strong>Phone:</strong> {application.personalInfo?.phone}</div>
                  <div><strong>Address:</strong> {application.personalInfo?.address}</div>
                  <div><strong>DOB:</strong> {application.personalInfo?.dateOfBirth ? new Date(application.personalInfo.dateOfBirth).toLocaleDateString() : '—'}</div>
                  <div><strong>Nationality:</strong> {application.personalInfo?.nationality}</div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="text-sm font-medium mb-2">Academic Information</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><strong>Institution:</strong> {application.academicInfo?.institution}</div>
                  <div><strong>Graduation Year:</strong> {application.academicInfo?.graduationYear}</div>
                  <div><strong>Previous Education:</strong> {application.academicInfo?.previousEducation}</div>
                  <div><strong>GPA:</strong> {application.academicInfo?.gpa}</div>
                </div>
              </div>
            </div>
            <div className="mt-2 p-4 border rounded bg-white">
              <h4 className="text-sm font-medium mb-2">Documents</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {application.documents?.idDocument && <a href={application.documents.idDocument} target="_blank" rel="noreferrer" className="p-3 border rounded text-sm text-emerald-600 hover:bg-emerald-50">View ID Document</a>}
                {application.documents?.transcript && <a href={application.documents.transcript} target="_blank" rel="noreferrer" className="p-3 border rounded text-sm text-emerald-600 hover:bg-emerald-50">View Transcript</a>}
                {application.documents?.personalStatement && <a href={application.documents.personalStatement} target="_blank" rel="noreferrer" className="p-3 border rounded text-sm text-emerald-600 hover:bg-emerald-50">View Personal Statement</a>}
                {application.documents?.recommendationLetter && <a href={application.documents.recommendationLetter} target="_blank" rel="noreferrer" className="p-3 border rounded text-sm text-emerald-600 hover:bg-emerald-50">View Recommendation Letter</a>}
              </div>
            </div>
            {application.personalStatement && (
              <div className="mt-2 p-4 border rounded bg-white">
                <h4 className="text-sm font-medium mb-2">Personal Statement</h4>
                <div className="text-sm text-gray-700 whitespace-pre-wrap">{application.personalStatement}</div>
              </div>
            )}
            <div className="mt-4 flex items-center justify-end space-x-3">
              {!canManage && <div />}
              {canManage && (
                <>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add admin notes (optional)" className="flex-1 p-2 border rounded h-24" />
                  <button onClick={() => handleChangeStatus("REJECTED")} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded flex items-center space-x-2">
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  <button onClick={() => handleChangeStatus("ADMITTED")} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Admit</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
