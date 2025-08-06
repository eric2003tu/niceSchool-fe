// ReviewStep.tsx
import React, { ChangeEvent, CSSProperties } from 'react';
import FormInput from "@/components/application-component/FormInput";

interface ReviewStepData {
  extracurriculars: string;
  workExperience: string;
  specialCircumstances: string;
  // Review display fields
  fullName: string;
  email: string;
  phone: string;
  currentEducation: string;
  gpa: string;
  graduationDate: string;
  academicAchievements: string;
  personalStatement: string;
}

interface ReviewStepProps {
  formData: ReviewStepData;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ 
  formData, 
  handleChange,
  className = ""
}) => {
  const truncateText = (text: string, maxLength: number = 100): string => {
    if (!text) return 'Not provided';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const displayValue = (value: string): string => {
    return value || 'Not provided';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <FormInput
        label="Extracurricular Activities & Leadership"
        name="extracurriculars"
        value={formData.extracurriculars}
        onChange={handleChange}
        textarea
        rows={4}
        placeholder="Clubs, sports, volunteer work, leadership roles..."
        required
      />
      
      <FormInput
        label="Work Experience & Internships"
        name="workExperience"
        value={formData.workExperience}
        onChange={handleChange}
        textarea
        rows={4}
        placeholder="Part-time jobs, internships, research positions..."
      />
      
      <FormInput
        label="Special Circumstances"
        name="specialCircumstances"
        value={formData.specialCircumstances}
        onChange={handleChange}
        textarea
        rows={3}
        placeholder="Any additional information or special circumstances..."
      />
      
      <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Application Review</h3>
        <div className="space-y-3 text-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <strong className="text-gray-700">Name:</strong>{' '}
              <span className="text-gray-600">{displayValue(formData.fullName)}</span>
            </div>
            <div>
              <strong className="text-gray-700">Email:</strong>{' '}
              <span className="text-gray-600">{displayValue(formData.email)}</span>
            </div>
            <div>
              <strong className="text-gray-700">Phone:</strong>{' '}
              <span className="text-gray-600">{displayValue(formData.phone)}</span>
            </div>
            <div>
              <strong className="text-gray-700">Education:</strong>{' '}
              <span className="text-gray-600">{displayValue(formData.currentEducation)}</span>
            </div>
            <div>
              <strong className="text-gray-700">GPA:</strong>{' '}
              <span className="text-gray-600">{displayValue(formData.gpa)}</span>
            </div>
            <div>
              <strong className="text-gray-700">Graduation:</strong>{' '}
              <span className="text-gray-600">{displayValue(formData.graduationDate)}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-300">
            <div>
              <strong className="text-gray-700">Academic Achievements:</strong>{' '}
              <span className="text-gray-600">{truncateText(formData.academicAchievements)}</span>
            </div>
            <div>
              <strong className="text-gray-700">Personal Statement:</strong>{' '}
              <span className="text-gray-600">{truncateText(formData.personalStatement)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;