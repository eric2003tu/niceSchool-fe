"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface RequestFormData {
  fullName: string;
  email: string;
  phone: string;
  program: string;
  message: string;
}

interface ProgramOption {
  value: string;
  label: string;
}

const programOptions: ProgramOption[] = [
  { value: "", label: "Program of Interest" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Business Administration", label: "Business Administration" },
  { value: "Engineering", label: "Engineering" }
];

const RequestInfo: React.FC = () => {
  const [form, setForm] = useState<RequestFormData>({
    fullName: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm(prevForm => ({ 
      ...prevForm, 
      [name as keyof RequestFormData]: value 
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    // Add your form submission logic here
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Request Information
      </h2>
      <p className="text-gray-600 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida
        nibh vel velit auctor aliquet.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
          required
        />
        <select
          name="program"
          value={form.program}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
          required
        >
          {programOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <textarea
          name="message"
          placeholder="Questions or Comments"
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
          rows={3}
        />
        <button
          type="submit"
          className="w-full bg-[#0F9255] text-white py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestInfo;