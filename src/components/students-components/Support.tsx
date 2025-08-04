import React from 'react';
import {
  HeartPulse,
  Briefcase,
  Accessibility,
  GraduationCap,
} from 'lucide-react';

const supportServices = [
  {
    icon: <HeartPulse className="text-green-600 w-6 h-6" />,
    title: 'Health & Wellness',
    description:
      'Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.',
  },
  {
    icon: <Briefcase className="text-green-600 w-6 h-6" />,
    title: 'Career Services',
    description:
      'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vivamus sagittis lacus vel augue.',
  },
  {
    icon: <Accessibility className="text-green-600 w-6 h-6" />,
    title: 'Accessibility',
    description:
      'Nullam id dolor id nibh ultricies vehicula ut id elit. Sed posuere consectetur est lobortis.',
  },
  {
    icon: <GraduationCap className="text-green-600 w-6 h-6" />,
    title: 'Academic Support',
    description:
      'Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.',
  },
];

const Support = () => {
  return (
    <div className="px-6 py-10 max-w-screen-xl mx-auto">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {supportServices.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition"
          >
            <div className="bg-green-50 rounded-full p-2 w-fit mb-4">
              {service.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <a
              href="#"
              className="text-green-700 text-sm font-medium hover:underline flex items-center gap-1"
            >
              Learn More →
            </a>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-green-50 text-center p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Need Assistance?</h2>
        <p className="text-gray-600 mb-4">
          Our student support team is available Monday through Friday, 8am to 5pm.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition">
          Contact Student Services →
        </button>
      </div>
    </div>
  );
};

export default Support;
