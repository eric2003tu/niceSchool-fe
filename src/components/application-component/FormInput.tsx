// FormInput.tsx
import React, { ChangeEvent, ReactNode } from 'react';

interface FormInputProps {
  label?: string;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';
  placeholder?: string;
  required?: boolean;
  className?: string;
  rows?: number;
  textarea?: boolean;
  children?: ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  className = "",
  rows = 4,
  textarea = false,
  children
}) => {
  const inputClasses = `w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors ${className}`;
  
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          rows={rows}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default FormInput;