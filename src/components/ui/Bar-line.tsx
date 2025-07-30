import React from 'react';

const Bar = () => {
  return (
    <div className="w-full py-5 flex flex-wrap justify-center gap-4 bg-[#0F9255] text-white px-4 lg:justify-between lg:px-24 mt-8">
      {[
        { date: "Nov 15", title: "Open House Day" },
        { date: "Dec 5", title: "Application Workshop" },
        { date: "Jan 10", title: "International Student Orientation" },
      ].map((event, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-center gap-2 bg-[#0F9255]">
          <p className="border border-white rounded-md px-3 py-2 font-bold">{event.date}</p>
          <p className="px-3 py-2 text-center sm:text-left">{event.title}</p>
          <button className="bg-[#42b883] hover:bg-white hover:text-[#0F9255] transition-all duration-300 px-3 py-2 cursor-pointer rounded-md">
            Register
          </button>
        </div>
      ))}
    </div>
  );
};

export default Bar;
