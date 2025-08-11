import React, { ChangeEvent } from "react";
import FormInput from "@/components/application-component/FormInput";

interface AcademicInfo {
  previousEducation: string;
  gpa: number | "";
  graduationYear: number | "";
  institution: string;
}

interface EducationStepProps {
  formData: AcademicInfo;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const EducationStep: React.FC<EducationStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6 grid md:grid-cols-2 gap-6">
      <FormInput
        label="Previous Education"
        name="academicInfo.previousEducation"
        value={formData.previousEducation}
        onChange={handleChange}
        placeholder="High school, college, etc."
        required
      />
      <FormInput
        label="GPA"
        name="academicInfo.gpa"
        type="number"
        step="0.01"
        min="0"
        max="4"
        value={formData.gpa === "" ? "" : formData.gpa}
        onChange={handleChange}
        placeholder="e.g. 3.8"
        required
      />
      <FormInput
        label="Graduation Year"
        name="academicInfo.graduationYear"
        type="number"
        min="1900"
        max={(new Date().getFullYear() + 10).toString()}
        value={formData.graduationYear === "" ? "" : formData.graduationYear}
        onChange={handleChange}
        placeholder="e.g. 2023"
        required
      />
      <FormInput
        label="Institution"
        name="academicInfo.institution"
        value={formData.institution}
        onChange={handleChange}
        placeholder="Name of institution"
        required
      />
    </div>
  );
};

export default EducationStep;
