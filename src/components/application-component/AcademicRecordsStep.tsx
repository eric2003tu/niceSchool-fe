import React, { ChangeEvent } from "react";
import FormInput from "@/components/application-component/FormInput";

interface Documents {
  transcript: string;
  recommendationLetter: string;
  personalStatement: string;
  idDocument: string;
}

interface AcademicRecordsStepProps {
  formData: Documents;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AcademicRecordsStep: React.FC<AcademicRecordsStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <FormInput
        label="Transcript URL or File Path"
        name="documents.transcript"
        value={formData.transcript}
        onChange={handleChange}
        placeholder="Paste link or file identifier"
        required
      />
      <FormInput
        label="Recommendation Letter URL or File Path"
        name="documents.recommendationLetter"
        value={formData.recommendationLetter}
        onChange={handleChange}
        placeholder="Paste link or file identifier"
        required
      />
      <FormInput
        label="Personal Statement Document"
        name="documents.personalStatement"
        value={formData.personalStatement}
        onChange={handleChange}
        placeholder="Paste link or file identifier"
        required
      />
      <FormInput
        label="ID Document URL or File Path"
        name="documents.idDocument"
        value={formData.idDocument}
        onChange={handleChange}
        placeholder="Paste link or file identifier"
        required
      />
    </div>
  );
};

export default AcademicRecordsStep;
