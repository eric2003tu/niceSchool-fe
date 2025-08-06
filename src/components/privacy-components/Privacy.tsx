"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  });

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md lg:px-30">
      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
        <p className="text-gray-600">
          Effective Date: <span className="font-semibold">February 27, 2025</span>
        </p>
        <p className="text-gray-600 mt-4">
          This Privacy Policy describes how we collect, use, process, and disclose your information, 
          including personal information, in conjunction with your access to and use of our services.
        </p>
      </header>

      <section className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer py-4 border-b"
          onClick={() => toggleSection(1)}
        >
          <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
          {expandedSections[1] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections[1] && (
          <div className="py-4 px-2 text-gray-700">
            <p className="mb-4">
              When you use our services, you're trusting us with your information. We understand this is a big 
              responsibility and work hard to protect your information and put you in control.
            </p>
            <p>
              This Privacy Policy is meant to help you understand what information we collect, why we collect it, 
              and how you can update, manage, export, and delete your information.
            </p>
          </div>
        )}
      </section>

      <section className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer py-4 border-b"
          onClick={() => toggleSection(2)}
        >
          <h2 className="text-xl font-semibold text-gray-800">2. Information We Collect</h2>
          {expandedSections[2] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections[2] && (
          <div className="py-4 px-2 text-gray-700">
            <p className="mb-4">
              We collect information to provide better services to our users. The types of information we collect include:
            </p>
            
            <h3 className="font-semibold text-lg mt-4 mb-2">2.1 Information You Provide</h3>
            <p className="mb-4">
              When you create an account or use our services, you provide us with personal information that includes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information when required</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="font-semibold text-lg mt-4 mb-2">2.2 Automatic Information</h3>
            <p>
              We automatically collect and store certain information when you use our services:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Device information and identifiers</li>
              <li>Log information and usage statistics</li>
              <li>Location information when enabled</li>
              <li>Browser type and settings</li>
            </ul>
          </div>
        )}
      </section>

      <section className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer py-4 border-b"
          onClick={() => toggleSection(3)}
        >
          <h2 className="text-xl font-semibold text-gray-800">3. How We Use Your Information</h2>
          {expandedSections[3] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections[3] && (
          <div className="py-4 px-2 text-gray-700">
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services. 
              Specifically, we use your information to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and personalize our services</li>
              <li>Process transactions and send related information</li>
              <li>Send notifications and updates about our services</li>
              <li>Maintain security and verify identity</li>
              <li>Analyze and improve our services</li>
            </ul>
          </div>
        )}
      </section>

      <section className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer py-4 border-b"
          onClick={() => toggleSection(4)}
        >
          <h2 className="text-xl font-semibold text-gray-800">4. Information Sharing and Disclosure</h2>
          {expandedSections[4] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections[4] && (
          <div className="py-4 px-2 text-gray-700">
            <p className="mb-4">
              We do not share personal information with companies, organizations, or individuals 
              outside of our company except in the following cases:
            </p>
            
            <h3 className="font-semibold text-lg mt-4 mb-2">4.1 With Your Consent</h3>
            <p className="mb-4">
              We will share personal information with companies, organizations, or individuals outside 
              of our company when we have your consent to do so.
            </p>

            <h3 className="font-semibold text-lg mt-4 mb-2">4.2 For Legal Reasons</h3>
            <p className="mb-2">
              We will share personal information if we have a good-faith belief that access, use, 
              preservation, or disclosure of the information is reasonably necessary to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Meet any applicable law, regulation, legal process, or enforceable governmental request</li>
              <li>Enforce applicable Terms of Service</li>
              <li>Detect, prevent, or otherwise address fraud, security, or technical issues</li>
              <li>Protect against harm to the rights, property, or safety of our users</li>
            </ul>
          </div>
        )}
      </section>

      <section className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer py-4 border-b"
          onClick={() => toggleSection(5)}
        >
          <h2 className="text-xl font-semibold text-gray-800">5. Data Security</h2>
          {expandedSections[5] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections[5] && (
          <div className="py-4 px-2 text-gray-700">
            <p className="mb-4">
              We work hard to protect our users from unauthorized access to or unauthorized alteration, 
              disclosure, or destruction of information we hold. In particular:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We encrypt our services using SSL</li>
              <li>We review our information collection, storage, and processing practices</li>
              <li>We restrict access to personal information to employees who need that information</li>
            </ul>
          </div>
        )}
      </section>

      <section className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer py-4 border-b"
          onClick={() => toggleSection(6)}
        >
          <h2 className="text-xl font-semibold text-gray-800">6. Your Rights and Choices</h2>
          {expandedSections[6] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections[6] && (
          <div className="py-4 px-2 text-gray-700">
            <p className="mb-4">
              You have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to restrict or object to our processing of your information</li>
            </ul>
          </div>
        )}
      </section>

      <section className="mb-8">
        <div 
          className="flex items-center justify-between cursor-pointer py-4 border-b"
          onClick={() => toggleSection(7)}
        >
          <h2 className="text-xl font-semibold text-gray-800">7. Changes to This Policy</h2>
          {expandedSections[7] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections[7] && (
          <div className="py-4 px-2 text-gray-700">
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the effective date at the top.
            </p>
            <p>
              Your continued use of our services after any changes to this Privacy Policy constitutes 
              your acceptance of such changes.
            </p>
          </div>
        )}
      </section>

      <section className="mt-8 pt-6 border-t">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about this Privacy Policy or our practices, please contact us:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="font-medium w-24">Email:</span>
            <span>privacy@example.com</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium w-24">Address:</span>
            <span>123 Privacy Street, Security City, 12345</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;