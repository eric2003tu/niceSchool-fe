import React from 'react';
import { Shield, Lock, Users, FileText, Clock, AlertTriangle, Download, MessageCircle } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-blue-600 font-medium mb-2">
              Last Updated: February 27, 2025
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These terms and conditions outline your rights and responsibilities 
              when using our services
            </p>
          </div>
          
          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Secure Service</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Data Protection</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">Fair Terms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Agreement Terms */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Agreement Terms</h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              By accessing our service, you confirm that you are agreeing to be bound by these terms of 
              service. These terms apply to all users and visitors who use our service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Acceptance of terms</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Compliance with laws</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Service availability</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">User obligations</span>
              </div>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">User Rights</h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              As a user, you have specific rights when using our 
              service, including data privacy and access to 
              features.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Account control</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Data privacy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Service access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Content ownership</span>
              </div>
            </div>
          </div>

          {/* Restrictions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Restrictions</h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              To ensure a safe and fair experience for all users, 
              certain activities are prohibited when using our service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">No unauthorized data collection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">No service misuse</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">No intellectual property violations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">No harmful activities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Points Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Key Points to Note</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Availability */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Service Availability</h4>
              </div>
              <p className="text-sm text-gray-600">
                We strive to provide uninterrupted service but 
                cannot guarantee 100% availability.
              </p>
            </div>

            {/* Privacy Protection */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Privacy Protection</h4>
              </div>
              <p className="text-sm text-gray-600">
                Your data is protected according to our privacy 
                policy and applicable laws.
              </p>
            </div>

            {/* Content Rights */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Content Rights</h4>
              </div>
              <p className="text-sm text-gray-600">
                You retain rights to your content while granting us 
                license to use.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Service Modifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Service Modifications</h4>
            </div>
            <p className="text-sm text-gray-600">
              We reserve the right to modify or discontinue any part of our service with or without notice.
            </p>
          </div>

          {/* Account Termination */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Account Termination</h4>
            </div>
            <p className="text-sm text-gray-600">
              We may terminate accounts that violate these terms at our sole discretion.
            </p>
          </div>
        </div>

        {/* Terms Updates */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-16 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Terms Updates</h4>
              <p className="text-sm text-gray-600">
                These terms may be updated at any time. Continued use of the service implies acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>

        {/* Need Clarification Section */}
        <div className="text-center bg-white rounded-xl border border-gray-200 p-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Need Clarification?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            If you have questions about these terms, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Terms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;