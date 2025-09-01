"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { User, GraduationCap, FileText, Award, Heart, Send, LucideIcon } from "lucide-react";

import ProgressStepper from "@/components/application-component/ProgressStepper";
import api from '@/lib/api';
import FormStepHeader from "@/components/application-component/FormStepHeader";
import NavigationButtons from "@/components/application-component/NavigationButtons";

import PersonalInfoStep from "@/components/application-component/PersonalInfoStep";
import EducationStep from "@/components/application-component/EducationStep";
import AcademicRecordsStep from "@/components/application-component/AcademicRecordsStep";
import EssaysStep from "@/components/application-component/EssaysStep";
import ReviewStep from "@/components/application-component/ReviewStep";

interface FormData {
  program: string;
  academicYear: string;
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
    academicYear: "",

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
      const response = await api.post('/admissions/apply', formData);
      alert('Application submitted successfully!');
      // Optionally reset form or redirect user here
    } catch (error: any) {
      alert(`Error submitting application: ${error?.response?.data?.message || error.message || error}`);
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
      "program",
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
            <PersonalInfoStep formData={formData} handleChange={handleChange} />
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
