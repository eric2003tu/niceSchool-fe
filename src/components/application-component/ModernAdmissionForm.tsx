"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { User, GraduationCap, FileText, Award, Heart, Send, LucideIcon } from "lucide-react";

import ProgressStepper from "@/components/application-component/ProgressStepper";
import api, { extractList } from '@/lib/api';
import FormStepHeader from "@/components/application-component/FormStepHeader";
import NavigationButtons from "@/components/application-component/NavigationButtons";

import PersonalInfoStep from "@/components/application-component/PersonalInfoStep";
import EducationStep from "@/components/application-component/EducationStep";
import AcademicRecordsStep from "@/components/application-component/AcademicRecordsStep";
import EssaysStep from "@/components/application-component/EssaysStep";
import ReviewStep from "@/components/application-component/ReviewStep";

interface FormData {
  program: string;
  programId?: string;
  course?: string;
  courseId?: string;
  department?: { id?: string; name?: string };
  academicYear: string;
  departmentId?: string;
   personalInfo:{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    nationality: string;
   }

  academicInfo: {
    previousEducation: string;
    gpa: number | "";
    graduationYear: number | "";
    institution: string;
  };

  documents: {
    transcript: string;
    recommendationLetter: string;
    personalStatement: string;
    idDocument: string;
  };

  personalStatement: string;
}

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
}

type RequiredFieldsMap = Record<number, string[]>;

const ModernAdmissionForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<FormData>({
    program: "",
  programId: "",
  course: "",
  courseId: "",
    academicYear: "",
  departmentId: "",
  department: { id: '', name: '' },

    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      nationality: "",
    },

    academicInfo: {
      previousEducation: "",
      gpa: "",
      graduationYear: "",
      institution: "",
    },

    documents: {
      transcript: "",
      recommendationLetter: "",
      personalStatement: "",
      idDocument: "",
    },

    personalStatement: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        const updated = { ...prev };
        let current: any = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = { ...current[keys[i]] };
          current = current[keys[i]];
        }
        if (
          (name === "academicInfo.gpa" || name === "academicInfo.graduationYear") &&
          value !== ""
        ) {
          current[keys[keys.length - 1]] = Number(value);
        } else {
          current[keys[keys.length - 1]] = value;
        }
        return updated;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
  // map formData to backend shape
  const payload = {
    programId: formData.programId || '',
    departmentId: formData.department?.id || formData.departmentId || '',
    courseId: formData.courseId || '',
    program: { id: formData.programId || '', name: formData.program || '' },
    department: { id: formData.department?.id || formData.departmentId || '', name: formData.department?.name || '' },
    course: { id: formData.courseId || '', name: formData.course || '' },
    academicYear: formData.academicYear,
    personalInfo: formData.personalInfo,
    academicInfo: formData.academicInfo,
    documents: formData.documents,
    personalStatement: formData.personalStatement,
  };
  // helper: remove undefined and ensure plain object values for nested objects
  const clean = (obj: any) => {
    if (obj == null) return obj;
    if (typeof obj !== 'object') return obj;
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v === undefined) continue;
      if (v == null) { out[k] = v; continue; }
      if (typeof v === 'object') out[k] = clean(v);
      else out[k] = v;
    }
    return out;
  };

  const sanitized = JSON.parse(JSON.stringify(clean(payload)));
  // debug log payload (dev) so you can inspect what the backend receives
  // eslint-disable-next-line no-console
  console.debug('Submitting application payload:', sanitized);
  const response = await api.post('/admissions/apply', sanitized);
      alert('Application submitted successfully!');
      // Optionally reset form or redirect user here
    } catch (error: any) {
      // show more detailed server response when available
      const serverMsg = error?.response?.data || error?.response?.data?.message || error.message || String(error);
      // eslint-disable-next-line no-console
      console.error('Application submit error:', error?.response || error);
      alert(`Error submitting application:\n${JSON.stringify(serverMsg, null, 2)}`);
    }
  };

  const steps: Step[] = [
    { id: 1, title: "Personal Info", icon: User, description: "Basic personal details" },
    { id: 2, title: "Education", icon: GraduationCap, description: "Educational background" },
    { id: 3, title: "Academic Records", icon: FileText, description: "Transcripts & achievements" },
    { id: 4, title: "Essays", icon: Heart, description: "Personal statements" },
    { id: 5, title: "Review", icon: Send, description: "Review & submit your application" },
  ];

  const requiredFields: RequiredFieldsMap = {
    1: [
  "departmentId",
  "program",
  "course",
      "academicYear",
      "personalInfo.firstName",
      "personalInfo.lastName",
      "personalInfo.email",
      "personalInfo.phone",
      "personalInfo.dateOfBirth",
      "personalInfo.address",
      "personalInfo.nationality",
    ],
    2: [
      "academicInfo.previousEducation",
      "academicInfo.gpa",
      "academicInfo.graduationYear",
      "academicInfo.institution",
    ],
    3: [
      "documents.transcript",
      "documents.recommendationLetter",
      "documents.personalStatement",
      "documents.idDocument",
    ],
    4: ["personalStatement"],
  };

  const isStepComplete = (stepNum: number): boolean => {
    const fields = requiredFields[stepNum] || [];
    return fields.every((field) => {
      const keys = field.split(".");
      let value: any = formData;
      for (const key of keys) {
        if (value == null) return false;
        value = value[key];
      }
      if (typeof value === "number") return !isNaN(value);
      return typeof value === "string" && value.trim() !== "";
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <FormStepHeader
              title="Personal Information"
              description="Let's start with your basic details. This information helps us identify and contact you throughout the admission process."
            />
            <div className="space-y-4">
              {/* department select fetched from backend */}
              <DepartmentSelect
                departmentId={formData.departmentId}
                onChange={(sel: { id: string; name: string }) => setFormData(prev => ({ ...prev, departmentId: sel.id, department: { id: sel.id, name: sel.name }, program: '', programId: '', course: '', courseId: '' }))}
              />
              <ProgramSelect
                departmentId={formData.departmentId}
                programId={formData.programId}
                onChange={(sel: { id: string; name: string }) => setFormData(prev => ({ ...prev, program: sel.name, programId: sel.id, course: '', courseId: '' }))}
              />
              <CourseSelect
                programId={formData.programId}
                courseId={formData.courseId}
                onChange={(sel: { id: string; name: string }) => setFormData(prev => ({ ...prev, course: sel.name, courseId: sel.id }))}
              />
              <PersonalInfoStep formData={formData} handleChange={handleChange} />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <FormStepHeader
              title="Educational Background"
              description="Tell us about your current and previous educational experiences. This helps us understand your academic journey."
            />
            <EducationStep formData={formData.academicInfo} handleChange={handleChange} />
          </>
        );

      case 3:
        return (
          <>
            <FormStepHeader
              title="Academic Records & Documents"
              description="Share your transcripts, recommendation letters, and personal statements."
            />
            <AcademicRecordsStep formData={formData.documents} handleChange={handleChange} />
          </>
        );

      case 4:
        return (
          <>
            <FormStepHeader
              title="Personal Statement"
              description="Write your personal statement for the admission committee."
            />
            <EssaysStep formData={{ personalStatement: formData.personalStatement }} handleChange={handleChange} />
          </>
        );

      case 5:
        return (
          <>
            <FormStepHeader
              title="Review & Submit"
              description="Review all your information before submission."
            />
            <ReviewStep data={formData} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 lg:px-15 px-4">
      <div className="w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          NiceSchool Application Portal
          </h1>
          <p className="text-gray-600 text-lg">Take the first step towards your academic future</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <ProgressStepper steps={steps} currentStep={step} isStepComplete={isStepComplete} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {renderStepContent()}

          <NavigationButtons
            currentStep={step}
            totalSteps={steps.length}
            onPrev={prevStep}
            onNext={nextStep}
            isLastStep={step === steps.length}
            disabled={!isStepComplete(step)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
};

export default ModernAdmissionForm;

// simple department select component (local to this file)
import { useEffect } from 'react';
function DepartmentSelect({ departmentId, onChange }: { departmentId?: string; onChange: (sel: { id: string; name: string }) => void }) {
  const [deps, setDeps] = React.useState<any[]>([]);
  const [loadingDeps, setLoadingDeps] = React.useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingDeps(true);
        const res = await api.get('/academics/departments').catch(() => ({ data: [] }));
        if (!mounted) return;
        // normalize to array
        const list = extractList(res.data);
        setDeps(list);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoadingDeps(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
  <select aria-label="Department" required value={departmentId} onChange={(e) => {
        const id = e.target.value;
        const sel = deps.find((d: any) => (d.id || d._id) === id);
        onChange({ id, name: sel?.name || '' });
      }} className="w-full border rounded p-2">
        <option value="">Select department</option>
        {Array.isArray(deps) && deps.map(d => (
          <option key={d.id || d._id} value={d.id || d._id}>{d.name}</option>
        ))}
      </select>
    </div>
  );
}

// program select that loads programs for a given department
function ProgramSelect({ departmentId, programId, onChange }: { departmentId?: string; programId?: string; onChange: (sel: { id: string; name: string }) => void }) {
  const [programs, setPrograms] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const labelFor = (item: any) => {
    if (!item) return '';
    return item.name || item.title || item.programName || item.label || item.code || item._id || '';
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!departmentId) {
        setPrograms([]);
        return;
      }
      try {
        setLoading(true);
        // fetch programs for department
        // try department-scoped programs endpoint first, fallback to query endpoint
        let res: any;
        try {
          res = await api.get(`/academics/departments/${departmentId}/programs`);
        } catch (_) {
          res = await api.get(`/academics/programs?departmentId=${departmentId}`).catch(() => ({ data: [] }));
        }
        if (!mounted) return;
        const list = extractList(res.data);
        setPrograms(list);
      } catch (e) {
        setPrograms([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [departmentId]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Program <span className="text-red-500">*</span></label>
      <select aria-label="Program" required disabled={!departmentId || loading} value={programId} onChange={(e) => {
        const id = e.target.value;
        const sel = programs.find((p: any) => (p.id || p._id) === id);
        onChange({ id, name: sel?.name || '' });
      }} className="w-full border rounded p-2">
        <option value="">{departmentId ? (loading ? 'Loading programs...' : 'Select program') : 'Select department first'}</option>
        {Array.isArray(programs) && programs.map(p => (
          <option key={p.id || p._id} value={p.id || p._id}>{labelFor(p)}</option>
        ))}
      </select>
    </div>
  );
}

// course select that loads courses for a given program
function CourseSelect({ programId, courseId, onChange }: { programId?: string; courseId?: string; onChange: (sel: { id: string; name: string }) => void }) {
  const [courses, setCourses] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [lastRawResponse, setLastRawResponse] = React.useState<string>('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!programId) {
        setCourses([]);
        return;
      }
      try {
        setLoading(true);
        // try program-scoped courses endpoint first, fallback to query endpoint
        let res: any;
        try {
          res = await api.get(`/academics/programs/${programId}/courses`);
        } catch (_) {
          res = await api.get(`/academics/courses?programId=${programId}`).catch(() => ({ data: [] }));
        }
        if (!mounted) return;
        const list = extractList(res.data);
        setCourses(list);
        // Debug: if no courses found but programId exists, capture the raw response and log it
        if (Array.isArray(list) && list.length === 0) {
          try {
            // store a brief serialized snapshot for quick UI hint
            setLastRawResponse(JSON.stringify(res && res.data ? res.data : res, null, 2));
            // also log detailed object to console for debugging
            // eslint-disable-next-line no-console
            console.debug('CourseSelect: no courses found for programId=', programId, 'raw response:', res);
          } catch (e) {
            // ignore
          }
        } else {
          setLastRawResponse('');
        }
      } catch (e) {
        setCourses([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [programId]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Course <span className="text-red-500">*</span></label>
      <select aria-label="Course" required disabled={!programId || loading} value={courseId} onChange={(e) => {
        const id = e.target.value;
        const sel = courses.find((c: any) => (c.id || c._id) === id);
        const label = sel ? (sel.name || sel.title || sel.courseName || sel.label || sel.code || '') : '';
        onChange({ id, name: label });
      }} className="w-full border rounded p-2">
        <option value="">{programId ? (loading ? 'Loading courses...' : 'Select course') : 'Select program first'}</option>
        {Array.isArray(courses) && courses.map(c => (
          <option key={c.id || c._id} value={c.id || c._id}>{c.name || c.title || c.courseName || c.label || c.code || ''}</option>
        ))}
      </select>
      {programId && !loading && Array.isArray(courses) && courses.length === 0 && (
        <p className="text-sm text-yellow-700 mt-2">No courses found for the selected program. Check the browser console for the API response.</p>
      )}
      {lastRawResponse && (
        <details className="mt-2 text-xs text-gray-600">
          <summary className="cursor-pointer">Raw response snapshot (dev)</summary>
          <pre className="whitespace-pre-wrap max-h-40 overflow-auto p-2 bg-gray-50 border rounded mt-1">{lastRawResponse}</pre>
        </details>
      )}
    </div>
  );
}
