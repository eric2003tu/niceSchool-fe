import React from "react";

interface ReviewStepProps {
  data: {
    program: string;
    academicYear: string;
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      address: string;
      nationality: string;
    };

    academicInfo: {
      previousEducation: string;
      gpa: number | "";
      graduationYear: number | "";
      institution: string;
    };

    documents: {
      transcript: string;
      recommendationLetter: string;
      personalStatement: string;
      idDocument: string;
    };

    personalStatement: string;
  };
}

const ReviewStep: React.FC<ReviewStepProps> = ({ data }) => {
  const display = (val: any) => (val ? val.toString() : "Not provided");

  return (
    <div className="space-y-6">
      <section className="bg-gray-50 p-4 rounded-md border border-gray-300">
        <h3 className="text-xl font-semibold mb-2">Program Info</h3>
        <p><strong>Program:</strong> {display(data.program)}</p>
        <p><strong>Academic Year:</strong> {display(data.academicYear)}</p>
      </section>

      <section className="bg-gray-50 p-4 rounded-md border border-gray-300">
        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
        <p><strong>First Name:</strong> {display(data.personalInfo.firstName)}</p>
        <p><strong>Last Name:</strong> {display(data.personalInfo.lastName)}</p>
        <p><strong>Email:</strong> {display(data.personalInfo.email)}</p>
        <p><strong>Phone:</strong> {display(data.personalInfo.phone)}</p>
        <p><strong>Date of Birth:</strong> {display(data.personalInfo.dateOfBirth)}</p>
        <p><strong>Address:</strong> {display(data.personalInfo.address)}</p>
        <p><strong>Nationality:</strong> {display(data.personalInfo.nationality)}</p>
      </section>

      <section className="bg-gray-50 p-4 rounded-md border border-gray-300">
        <h3 className="text-xl font-semibold mb-2">Academic Information</h3>
        <p><strong>Previous Education:</strong> {display(data.academicInfo.previousEducation)}</p>
        <p><strong>GPA:</strong> {display(data.academicInfo.gpa)}</p>
        <p><strong>Graduation Year:</strong> {display(data.academicInfo.graduationYear)}</p>
        <p><strong>Institution:</strong> {display(data.academicInfo.institution)}</p>
      </section>

      <section className="bg-gray-50 p-4 rounded-md border border-gray-300">
        <h3 className="text-xl font-semibold mb-2">Documents</h3>
        <p><strong>Transcript:</strong> {display(data.documents.transcript)}</p>
        <p><strong>Recommendation Letter:</strong> {display(data.documents.recommendationLetter)}</p>
        <p><strong>Personal Statement Document:</strong> {display(data.documents.personalStatement)}</p>
        <p><strong>ID Document:</strong> {display(data.documents.idDocument)}</p>
      </section>

      <section className="bg-gray-50 p-4 rounded-md border border-gray-300">
        <h3 className="text-xl font-semibold mb-2">Personal Statement</h3>
        <p>{display(data.personalStatement)}</p>
      </section>
    </div>
  );
};


export default ReviewStep;
