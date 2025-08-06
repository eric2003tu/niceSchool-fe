// EducationStep.tsx
import React, { ChangeEvent } from 'react';
import FormInput from "@/components/application-component/FormInput";
import FormSelect from "@/components/application-component/FormSelect";

interface SelectOption {
  value: string;
  label: string;
}

interface EducationData {
  currentEducation: string;
  gpa: string;
  graduationDate: string;
  previousSchools: string;
}

interface EducationStepProps {
  formData: EducationData;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  className?: string;
}

const educationOptions: SelectOption[] = [
  { value: "", label: "Select your current level" },
  { value: "high-school", label: "High School Student" },
  { value: "high-school-graduate", label: "High School Graduate" },
  { value: "undergraduate", label: "Undergraduate Student" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "other", label: "Other" }
];

const EducationStep: React.FC<EducationStepProps> = ({ 
  formData, 
  handleChange,
  className = ""
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <FormSelect
        label="Current Education Level"
        name="currentEducation"
        value={formData.currentEducation}
        onChange={handleChange}
        options={educationOptions}
        required
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="GPA / Grade Average"
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
          placeholder="e.g., 3.8/4.0 or 85%"
          required
        />
        
        <FormInput
          label="Expected Graduation Date"
          name="graduationDate"
          type="month"
          value={formData.graduationDate}
          onChange={handleChange}
          required
        />
      </div>
      
      <FormInput
        label="Previous Schools Attended"
        name="previousSchools"
        value={formData.previousSchools}
        onChange={handleChange}
        textarea
        rows={4}
        placeholder="List your previous educational institutions..."
      />
    </div>
  );
};

export default EducationStep;