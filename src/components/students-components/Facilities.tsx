import React from 'react';
import {
  Home,
  Utensils,
  BookOpen,
  Bike,
} from 'lucide-react';

const features = [
  {
    icon: <Home className="w-5 h-5 text-green-600" />,
    title: 'Residence Halls',
    description: '10 modern residence halls with various room configurations',
  },
  {
    icon: <Utensils className="w-5 h-5 text-green-600" />,
    title: 'Dining Options',
    description: '5 dining locations with diverse meal options',
  },
  {
    icon: <BookOpen className="w-5 h-5 text-green-600" />,
    title: 'Libraries',
    description: '3 libraries with extensive physical and digital collections',
  },
  {
    icon: <Bike className="w-5 h-5 text-green-600" />,
    title: 'Recreation Center',
    description: 'State-of-the-art fitness equipment and facilities',
  },
];

const Facilities = () => {
  return (
    <div className="px-6 py-10 max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
      {/* Left: Image Grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <img src="campus.webp" alt="campus-1" className="rounded-lg w-full h-full object-cover" />
        <img src="education-2.webp" alt="campus-2" className="rounded-lg w-full h-full object-cover" />
        <img src="blog-post-3.webp" alt="campus-3" className="rounded-lg w-full h-full object-cover" />
        <img src="education-9.webp" alt="campus-4" className="rounded-lg w-full h-full object-cover" />
      </div>

      {/* Right: Content */}
      <div>
        <h2 className="text-3xl font-bold mb-4">Modern Campus Facilities</h2>
        <p className="text-gray-600 mb-6">
          Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum.
          Aenean lacinia bibendum nulla sed consectetur.
        </p>

        <div className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start bg-white rounded-lg shadow-sm p-4">
              <div className="mr-3">{feature.icon}</div>
              <div>
                <h4 className="font-semibold text-sm">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition flex items-center gap-2">
          Virtual Campus Tour
          <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  );
};

export default Facilities;
