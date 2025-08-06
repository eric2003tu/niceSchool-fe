// EssaysStep.tsx
import React, { ChangeEvent } from 'react';
import FormInput from "@/components/application-component/FormInput";

interface EssaysData {
  personalStatement: string;
  careerGoals: string;
  whyThisProgram: string;
}

interface EssaysStepProps {
  formData: EssaysData;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
}

const EssaysStep: React.FC<EssaysStepProps> = ({ 
  formData, 
  handleChange,
  className = ""
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <FormInput
        label="Personal Statement"
        name="personalStatement"
        value={formData.personalStatement}
        onChange={handleChange}
        textarea
        rows={6}
        placeholder="Share your story, challenges you've overcome, formative experiences, and personal qualities that will contribute to our academic community..."
        required
      >
        <p className="text-sm text-gray-500 mb-3">
          Tell us about yourself, your background, experiences, and what makes you unique. (500-800 words recommended)
        </p>
      </FormInput>
      
      <FormInput
        label="Career Goals & Aspirations"
        name="careerGoals"
        value={formData.careerGoals}
        onChange={handleChange}
        textarea
        rows={5}
        placeholder="What are your professional aspirations? How do you see your career developing over the next 5-10 years?"
        required
      >
        <p className="text-sm text-gray-500 mb-3">
          Describe your short-term and long-term career objectives. (300-500 words recommended)
        </p>
      </FormInput>
      
      <FormInput
        label="Why This Program?"
        name="whyThisProgram"
        value={formData.whyThisProgram}
        onChange={handleChange}
        textarea
        rows={4}
        placeholder="What attracted you to our program? How does it align with your goals? What specific aspects excite you most?"
      >
        <p className="text-sm text-gray-500 mb-3">
          Explain why you're interested in this specific program and institution. (200-400 words recommended)
        </p>
      </FormInput>
    </div>
  );
};

export default EssaysStep;