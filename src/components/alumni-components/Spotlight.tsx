import React from 'react';

const Spotlight = () => {
  const spot = [
    {
      title: "Ketia has pioneered inclusive tech solutions to uplift youth-led startups across Africa.",
      name: "Ketia ISIMBI",
      job: "Tech Entrepreneur & VC Partner",
      year: 2015,
      photo: "person-f-5.webp",
      trophy: "Tech Visionary of the Year",
    },
    {
      title: "Sophia is a globally recognized educator who redefined digital learning standards.",
      name: "Sophia Lin",
      job: "Innovative Educator & Author",
      year: 2025,
      photo: "person-f-2.webp",
      trophy: "Teacher of the Year",
    },
    {
      title: "Michael has built AI solutions that serve communities in developing regions.",
      name: "Michael Osei",
      job: "AI Developer & Humanitarian",
      year: 2018,
      photo: "person-m-5.webp",
      trophy: "Tech Impact Leader",
    },
    {
      title: "Jane is leading green tech revolutions through sustainable energy ventures.",
      name: "Jane Doe",
      job: "Green Tech Engineer",
      year: 2020,
      photo: "person-f-2.webp",
      trophy: "Eco Innovator Award",
    },
    {
      title: "Emmanuel mentors thousands of youth through his STEM empowerment foundation.",
      name: "Emmanuel N.",
      job: "STEM Advocate",
      year: 2019,
      photo: "person-m-11.webp",
      trophy: "Youth Mentor of the Year",
    },
    {
      title: "David is the creator of multiple tools used by modern software engineers worldwide.",
      name: "David Kim",
      job: "Open Source Contributor",
      year: 2022,
      photo: "person-m-6.webp",
      trophy: "Tech Builder Award",
    },
  ];

  return (
    <div className="w-full px-4 lg:px-32 text-[#0a0a40] text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Why Choose Us</h2>
      <div className="w-20 h-1 bg-[#0F9255] mx-auto mb-5 rounded"></div>
      <p className="text-gray-600">Extraordinary graduates making an impact in their fields</p>

      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 py-8">
        {spot.map((s, index) => (
          <div key={index} className="rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
            <div className="relative h-72 w-full">
              <img
                src={s.photo}
                alt={`${s.name} photo`}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-[#0F9255] text-white text-sm font-bold px-3 py-1 rounded-full">
                {s.year}
              </span>
            </div>
            <div className="p-5 flex flex-col gap-2 text-left">
              <h3 className="text-xl font-semibold">{s.name}</h3>
              <p className="text-[#0F9255] font-semibold">{s.job}</p>
              <p className="text-sm text-gray-700">{s.title}</p>
              <p className="italic text-xs text-gray-500 mt-1">{s.trophy}</p>
              <button className="text-[#0F9255] font-medium mt-3 hover:underline w-fit">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spotlight;
