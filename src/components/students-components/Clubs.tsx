import React from 'react';
import { Palette, Globe, Lightbulb, Music } from 'lucide-react';

const Clubs = () => {
  return (
    <div className="bg-green-50 rounded-xl p-6 flex flex-col lg:flex-row gap-6 items-center justify-between">
      {/* Left Image Section */}
      <div className="relative w-full lg:w-[40%]">
        <img src="/students.webp" alt="Students" className="rounded-lg w-full h-auto object-cover" />
        <div className="absolute top-4 right-4 bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow">
          <span className="text-lg font-bold block">50+</span>
          <span>Active Clubs</span>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="w-full lg:w-[60%] flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-green-900">Join a Community That Shares Your Interests</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sapien eget urna pellentesque fringilla. Suspendisse potenti. Vivamus aliquam in nisi non consectetur. Donec facilisis convallis ultrices.
        </p>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="bg-green-100 p-2 rounded-full">
              <Palette size={20} className="text-green-700" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Arts & Culture</h3>
              <p className="text-sm text-gray-500">12 Organizations</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="bg-green-100 p-2 rounded-full">
              <Globe size={20} className="text-green-700" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">International</h3>
              <p className="text-sm text-gray-500">8 Organizations</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="bg-green-100 p-2 rounded-full">
              <Lightbulb size={20} className="text-green-700" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Academic</h3>
              <p className="text-sm text-gray-500">15 Organizations</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="bg-green-100 p-2 rounded-full">
              <Music size={20} className="text-green-700" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Music</h3>
              <p className="text-sm text-gray-500">7 Organizations</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-full w-fit hover:bg-green-700 transition">
          Explore All Clubs →
        </button>
      </div>
    </div>
  );
};

export default Clubs;
