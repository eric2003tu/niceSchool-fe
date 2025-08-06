// AcademicRecordsStep.tsx
import React, { ChangeEvent } from 'react';
import FormInput from "@/components/application-component/FormInput";

interface AcademicRecordsData {
  academicAchievements: string;
  standardizedScores: string;
  coursework: string;
}

interface AcademicRecordsStepProps {
  formData: AcademicRecordsData;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
}

const AcademicRecordsStep: React.FC<AcademicRecordsStepProps> = ({ 
  formData, 
  handleChange,
  className = ""
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <FormInput
        label="Academic Achievements & Awards"
        name="academicAchievements"
        value={formData.academicAchievements}
        onChange={handleChange}
        textarea
        rows={4}
        placeholder="List your academic honors, scholarships, dean's list achievements, academic competitions, etc..."
        required
      />
      
      <FormInput
        label="Standardized Test Scores"
        name="standardizedScores"
        value={formData.standardizedScores}
        onChange={handleChange}
        textarea
        rows={3}
        placeholder="SAT, ACT, GRE, GMAT, TOEFL, IELTS scores with dates taken..."
        required
      />
      
      <FormInput
        label="Relevant Coursework"
        name="coursework"
        value={formData.coursework}
        onChange={handleChange}
        textarea
        rows={4}
        placeholder="List courses that are particularly relevant to the program you're applying for..."
      />
    </div>
  );
};

export default AcademicRecordsStep;