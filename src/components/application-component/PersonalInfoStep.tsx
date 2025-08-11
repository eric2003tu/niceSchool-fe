import React, { ChangeEvent } from "react";
import FormInput from "@/components/application-component/FormInput";

interface PersonalInfoStepProps {
  formData: {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      address: string;
      nationality: string;
    };
    program: string;
    academicYear: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          placeholder="Enter the program you are applying for"
          required
        />
        <FormInput
          label="Academic Year"
          name="academicYear"
          value={formData.academicYear}
          onChange={handleChange}
          placeholder="e.g. 2025"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          name="personalInfo.firstName"
          value={formData.personalInfo.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <FormInput
          label="Last Name"
          name="personalInfo.lastName"
          value={formData.personalInfo.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <FormInput
          label="Email"
          name="personalInfo.email"
          type="email"
          value={formData.personalInfo.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
        <FormInput
          label="Phone"
          name="personalInfo.phone"
          type="tel"
          value={formData.personalInfo.phone}
          onChange={handleChange}
          placeholder="+1 555 555 5555"
          required
        />
        <FormInput
          label="Date of Birth"
          name="personalInfo.dateOfBirth"
          type="date"
          value={formData.personalInfo.dateOfBirth}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Nationality"
          name="personalInfo.nationality"
          value={formData.personalInfo.nationality}
          onChange={handleChange}
          placeholder="Nationality"
          required
        />
      </div>
      <FormInput
        label="Address"
        name="personalInfo.address"
        value={formData.personalInfo.address}
        onChange={handleChange}
        textarea
        rows={3}
        placeholder="Your address"
      />
    </div>
  );
};

export default PersonalInfoStep;
