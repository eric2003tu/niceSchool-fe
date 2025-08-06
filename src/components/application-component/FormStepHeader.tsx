// FormStepHeader.tsx
import React from 'react';

interface FormStepHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const FormStepHeader: React.FC<FormStepHeaderProps> = ({ 
  title, 
  description,
  className = ""
}) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default FormStepHeader;