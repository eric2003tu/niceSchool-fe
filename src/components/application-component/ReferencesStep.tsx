// ReferencesStep.tsx
import React, { ChangeEvent } from 'react';
import FormInput from "@/components/application-component/FormInput";

interface ReferencesData {
  recommendationLetters: string;
  references: string;
  teacherContacts: string;
}

interface ReferencesStepProps {
  formData: ReferencesData;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
}

const ReferencesStep: React.FC<ReferencesStepProps> = ({ 
  formData, 
  handleChange,
  className = ""
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <FormInput
        label="Recommendation Letters"
        name="recommendationLetters"
        value={formData.recommendationLetters}
        onChange={handleChange}
        textarea
        rows={4}
        placeholder="Describe the recommendation letters you will provide (e.g., from teachers, professors, employers). Include their names, positions, and how they know you..."
        required
      />
      
      <FormInput
        label="Professional References"
        name="references"
        value={formData.references}
        onChange={handleChange}
        textarea
        rows={4}
        placeholder="List 2-3 professional references with their names, titles, organizations, phone numbers, and email addresses..."
        required
      />
      
      <FormInput
        label="Teacher/Professor Contacts"
        name="teacherContacts"
        value={formData.teacherContacts}
        onChange={handleChange}
        textarea
        rows={3}
        placeholder="Additional academic contacts who can provide insights about your academic performance..."
      />
    </div>
  );
};

export default ReferencesStep;