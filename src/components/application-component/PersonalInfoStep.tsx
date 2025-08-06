// PersonalInfoStep.tsx
import React, { ChangeEvent } from 'react';
import FormInput from "@/components/application-component/FormInput";

interface PersonalInfoData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
}

interface PersonalInfoStepProps {
  formData: PersonalInfoData;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ 
  formData, 
  handleChange,
  className = ""
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full legal name"
          required
        />
        
        <FormInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
        />
        
        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>
      
      <FormInput
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        textarea
        rows={3}
        placeholder="Your current mailing address"
      />
    </div>
  );
};

export default PersonalInfoStep;