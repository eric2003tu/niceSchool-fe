import React, { ChangeEvent } from "react";

interface EssaysStepProps {
  formData: {
    personalStatement: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const EssaysStep: React.FC<EssaysStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4">
      <label className="block font-semibold mb-2" htmlFor="personalStatement">
        Personal Statement
      </label>
      <textarea
        id="personalStatement"
        name="personalStatement"
        value={formData.personalStatement}
        onChange={handleChange}
        rows={8}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="Write your personal statement here..."
        required
      />
    </div>
  );
};

export default EssaysStep;
