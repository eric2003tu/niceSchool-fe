"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { User, GraduationCap, FileText, Award, Heart, Send, LucideIcon } from "lucide-react";
import ProgressStepper from "@/components/application-component/ProgressStepper";
import FormStepHeader from "@/components/application-component/FormStepHeader";
import NavigationButtons from "@/components/application-component/NavigationButtons";
import PersonalInfoStep from "@/components/application-component/PersonalInfoStep";
import EducationStep from "@/components/application-component/EducationStep";
import AcademicRecordsStep from "@/components/application-component/AcademicRecordsStep";
import ReferencesStep from "@/components/application-component/ReferencesStep";
import EssaysStep from "@/components/application-component/EssaysStep";
import ReviewStep from "@/components/application-component/ReviewStep";

interface FormData {
  // Step 1: Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  
  // Step 2: Educational Background
  currentEducation: string;
  gpa: string;
  graduationDate: string;
  previousSchools: string;
  
  // Step 3: Academic Records & Transcripts
  academicAchievements: string;
  standardizedScores: string;
  coursework: string;
  
  // Step 4: Recommendations & References
  recommendationLetters: string;
  references: string;
  teacherContacts: string;
  
  // Step 5: Personal Statement & Essays
  personalStatement: string;
  careerGoals: string;
  whyThisProgram: string;
  
  // Step 6: Additional Information
  extracurriculars: string;
  workExperience: string;
  specialCircumstances: string;
}

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
}

type RequiredFieldsMap = Record<number, (keyof FormData)[]>;

const ModernAdmissionForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    
    // Step 2: Educational Background
    currentEducation: "",
    gpa: "",
    graduationDate: "",
    previousSchools: "",
    
    // Step 3: Academic Records & Transcripts
    academicAchievements: "",
    standardizedScores: "",
    coursework: "",
    
    // Step 4: Recommendations & References
    recommendationLetters: "",
    references: "",
    teacherContacts: "",
    
    // Step 5: Personal Statement & Essays
    personalStatement: "",
    careerGoals: "",
    whyThisProgram: "",
    
    // Step 6: Additional Information
    extracurriculars: "",
    workExperience: "",
    specialCircumstances: ""
  });

  const steps: Step[] = [
    { id: 1, title: "Personal Info", icon: User, description: "Basic personal details" },
    { id: 2, title: "Education", icon: GraduationCap, description: "Educational background" },
    { id: 3, title: "Academic Records", icon: FileText, description: "Transcripts & achievements" },
    { id: 4, title: "References", icon: Award, description: "Recommendations & contacts" },
    { id: 5, title: "Essays", icon: Heart, description: "Personal statements" },
    { id: 6, title: "Additional Info", icon: Send, description: "Final details & review" }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prevData => ({ 
      ...prevData, 
      [name as keyof FormData]: value 
    }));
  };

  const nextStep = (): void => setStep((prev) => prev + 1);
  const prevStep = (): void => setStep((prev) => prev - 1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitted Form:", formData);
    alert("Application submitted successfully!");
  };

  const isStepComplete = (stepNum: number): boolean => {
    const requiredFields: RequiredFieldsMap = {
      1: ['fullName', 'email', 'phone', 'dateOfBirth'],
      2: ['currentEducation', 'gpa', 'graduationDate'],
      3: ['academicAchievements', 'standardizedScores'],
      4: ['recommendationLetters', 'references'],
      5: ['personalStatement', 'careerGoals'],
      6: ['extracurriculars']
    };
    
    return requiredFields[stepNum]?.every(field => {
      const value = formData[field];
      return typeof value === 'string' && value.trim() !== '';
    }) || false;
  };

  const renderStepContent = (): React.ReactElement | null => {
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
            <EducationStep formData={formData} handleChange={handleChange} />
          </>
        );
      case 3:
        return (
          <>
            <FormStepHeader 
              title="Academic Records & Achievements" 
              description="Share your academic accomplishments, test scores, and relevant coursework that demonstrate your readiness for our program." 
            />
            <AcademicRecordsStep formData={formData} handleChange={handleChange} />
          </>
        );
      case 4:
        return (
          <>
            <FormStepHeader 
              title="References & Recommendations" 
              description="Provide information about your recommendation letters and professional references who can speak to your qualifications." 
            />
            <ReferencesStep formData={formData} handleChange={handleChange} />
          </>
        );
      case 5:
        return (
          <>
            <FormStepHeader 
              title="Personal Statement & Essays" 
              description="This is your opportunity to tell your story and explain why you're the perfect fit for our program." 
            />
            <EssaysStep formData={formData} handleChange={handleChange} />
          </>
        );
      case 6:
        return (
          <>
            <FormStepHeader 
              title="Additional Information" 
              description="Complete your application with additional details and review all information before submission." 
            />
            <ReviewStep formData={formData} handleChange={handleChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            University Admission Application
          </h1>
          <p className="text-gray-600 text-lg">
            Take the first step towards your academic future
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <ProgressStepper 
            steps={steps} 
            currentStep={step} 
            isStepComplete={isStepComplete} 
          />
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            {renderStepContent()}
            
            <NavigationButtons
              currentStep={step}
              totalSteps={steps.length}
              onPrev={prevStep}
              onNext={nextStep}
              onSubmit={handleSubmit}
              isLastStep={step === steps.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernAdmissionForm;