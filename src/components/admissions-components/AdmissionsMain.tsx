"use client";
import React from 'react'
import AdmissionRequirements from './AdmissionRequirements';
import RequestInfo from './RequestInfo';
import DeadLines from './DeadLines';
import CampusApplySection from './CampusApplySection';

const AdmissionsMain = () => {


  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Main Title */}
      <div className='grid lg:grid-cols-2 grid-cols-1 w-full gap-2'>
        <div>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Begin Your Academic Journey Today
        </h1>
        <p className="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida
          nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum
          auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed
          odio sit amet.
        </p>
      </div>

      {/* How to Apply */}
      
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Apply</h2>
        <div className="space-y-8">
          {[
            {
              step: 1,
              title: "Submit Application",
              desc: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh. Praesent sapien massa.",
            },
            {
              step: 2,
              title: "Send Documents",
              desc: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel.",
            },
            {
              step: 3,
              title: "Interview Process",
              desc: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt.",
            },
            {
              step: 4,
              title: "Receive Decision",
              desc: "Vivamus suscipit tortor eget felis porttitor volutpat. Cras ultricies ligula sed magna dictum porta. Nulla quis lorem ut libero.",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DeadLines/>
      </div>
      <div className="flex flex-col gap-4">
        <AdmissionRequirements/>

         <RequestInfo/>

      </div>
      </div>
      <CampusApplySection/>
    </div>
  );
};

export default AdmissionsMain;
