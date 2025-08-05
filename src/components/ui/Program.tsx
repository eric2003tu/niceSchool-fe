"use client";
import { AlarmClock, Calendar, Users2 } from 'lucide-react';
import React, { useState } from 'react';

const Program = () => {
  const [filter, setFilter] = useState<string>('all');

  const program = [
    {
      title: "Business ",
      type: "Bachelor's Degree",
      year: 3,
      credits: 90,
      description: "Nullam sed augue a turpis bibendum cursus. Suspendisse potenti. Praesent mi diam, feugiat a tincidunt at.",
      photo: "education-1.webp"
    },
    {
      title: "Environmental",
      type: "Master's Degree",
      year: 2,
      credits: 60,
      description: "Aenean imperdiet, erat vel consequat mollis, nunc risus aliquam nunc, eget condimentum urna dui et metus.",
      photo: "education-2.webp"
    },
    {
      title: "Computer Science",
      type: "Certificate",
      year: 3,
      credits: 90,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      photo: "education-3.webp"
    },
    {
      title: "Medical Sciences",
      type: "Master's Degree",
      year: 2,
      credits: 60,
      description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
      photo: "education-5.webp"
    },
    {
      title: "Engineering",
      type: "Bachelor's Degree",
      year: 3,
      credits: 90,
      description: "Praesent tincidunt, massa et porttitor imperdiet, lorem ex ultricies ipsum, a tempus metus eros non tortor.",
      photo: "education-7.webp"
    },
    {
      title: "Data Science",
      type: "Certificate",
      year: 2,
      credits: 60,
      description: "Mauris sed erat in mi vestibulum commodo. Donec a purus at justo facilisis imperdiet integer pellentesque.",
      photo: "education-9.webp"
    }
  ];

  const filteredPrograms = filter === 'all' ? program : program.filter(p => p.type === filter);

  return (
    <div className="w-full lg:px-30 px-4">
      <div className="my-10 text-center">
        <h1 className='text-[#0a0a40] text-4xl font-bold'>Featured Programs</h1>
        <p className="text-[#0a0a40]">Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        <div className="flex flex-wrap justify-center lg:gap-4 gap-1 my-12">
          {['all', "Bachelor's Degree", "Master's Degree", 'Certificate'].map(type => (
            <button
              key={type}
              className={`text-white lg:px-5 px-2 py-2 rounded-full cursor-pointer group transition duration-700 transform hover:scale-[1.02] ${
                filter === type
                  ? 'bg-[#0F9255]'
                  : 'bg-gray-400 hover:bg-[#0F9255]'
              }`}
              onClick={() => setFilter(type)}
            >
              {type === 'all' ? 'All Programs' : type.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrograms.map((pro, index) => (
          <div
            key={index}
            className="group transition duration-700 transform hover:scale-[1.02] hover:shadow-2xl shadow-xl grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 bg-white rounded-xl overflow-hidden"
          >
            <div className="overflow-hidden">
              <img
                src={pro.photo}
                alt={pro.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-[#0a0a40] group-hover:text-[#0F9255] text-lg font-semibold transition duration-700">
                  {pro.title}
                </h1>
                <span className="text-white font-semibold bg-[#0F9255] rounded-lg text-sm px-2 py-1 group-hover:brightness-110 transition duration-700">
                  {pro.type}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm mb-3">
                <p className="flex items-center gap-1 text-gray-700">
                  <AlarmClock className="text-[#0F9255] w-4 h-4" />
                  {pro.year} Years
                </p>
                <p className="flex items-center gap-1 text-gray-700">
                  <Users2 className="text-[#0F9255] w-4 h-4" />
                  {pro.credits} Credits
                </p>
                <p className="flex items-center gap-1 text-gray-700">
                  <Calendar className="text-[#0F9255] w-4 h-4" />
                  Fall Only
                </p>
              </div>

              <p className="text-gray-600 text-sm">{pro.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Program;
