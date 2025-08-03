"use client";
import React, { useState } from 'react';

const AllNews = () => {
  const blog = [
    { photo: 'blog-post-1.webp', field: "Entertainment", title: "Possimus soluta ut id suscipit ea ut in quo quia et soluta", profile: "person-f-10.webp", name: "Mark Dower", date: "Jun 22, 2022" },
    { photo: 'blog-post-2.webp', field: "Politics", title: "Dolorum optio tempore voluptas dignissimos", profile: "person-m-11.webp", name: "Maria Doe", date: "Jan 1, 2022" },
    { photo: 'blog-post-3.webp', field: "Sports", title: "Nisi magni odit consequatur autem nulla dolorem", profile: "person-m-13.webp", name: "Eric Tuyishime", date: "Jun 5, 2022" },
    { photo: 'blog-hero-1.webp', field: "Entertainment", title: "New movies dropping this month", profile: "person-f-2.webp", name: "Mark Dower", date: "Jul 1, 2022" },
    { photo: 'blog-hero-2.webp', field: "Politics", title: "The rise of local elections", profile: "person-m-2.webp", name: "Maria Doe", date: "Feb 15, 2022" },
    { photo: 'blog-post-4.webp', field: "Sports", title: "The biggest football transfers", profile: "person-f-3.webp", name: "Eric Tuyishime", date: "Jul 15, 2022" },
    { photo: 'blog-post-5.webp', field: "Entertainment", title: "Behind the scenes of your favorite show", profile: "person-f-10.webp", name: "Mark Dower", date: "Aug 22, 2022" },
    { photo: 'blog-post-6.webp', field: "Politics", title: "How laws are changing globally", profile: "person-m-11.webp", name: "Maria Doe", date: "Mar 3, 2022" },
    { photo: 'blog-post-7.webp', field: "Sports", title: "Training routines of top athletes", profile: "person-m-13.webp", name: "Eric Tuyishime", date: "Apr 5, 2022" },
    { photo: 'blog-post-8.webp', field: "Entertainment", title: "Rising stars in the music industry", profile: "person-f-5.webp", name: "Alice Ray", date: "May 12, 2022" },
    { photo: 'blog-post-9.webp', field: "Politics", title: "Leaders on the global stage", profile: "person-m-6.webp", name: "Jonathan Dee", date: "Nov 4, 2021" },
    { photo: 'blog-post-10.webp', field: "Sports", title: "2022 Olympics highlights", profile: "person-f-7.webp", name: "Sandra Kim", date: "Dec 30, 2022" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(blog.length / itemsPerPage);

  const currentBlogs = blog.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="text-[#0a0a40] lg:px-30 px-4 w-full lg:justify-items-center">
      <h1 className='text-4xl font-bold'>Recent News</h1>
      <p className=''>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-5 rounded-lg">
        {currentBlogs.map((blo, index) => (
          <div key={index} className="w-full grid grid-cols-1 shadow-2xl group transition duration-300 transform hover:scale-[1.02]">
            <div style={{ backgroundImage: `url(${blo.photo})` }} className="w-full bg-cover bg-no-repeat rounded-t-lg h-64 p-2">
              <p className='w-fit bg-[#0F9255] text-white font-bold text-center px-4 p-2 rounded-full'>{blo.field}</p>
            </div>
            <div className="w-full p-3 flex flex-col gap-3 rounded-b-lg">
              <h1 className="font-semibold">{blo.title}</h1>
              <div className="flex flex-row gap-4 items-center">
                <img src={blo.profile} alt={blo.title} className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                  <p className="font-bold">{blo.name}</p>
                  <span className="text-gray-500">{blo.date}</span>
                </div>
              </div>
            </div>
            <button className='bg-[#0F9255] w-fit text-center px-4 py-1 rounded-lg cursor-pointer font-bold hover:text-white m-2'>View More</button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded bg-[#0F9255] text-white disabled:opacity-50`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="font-bold text-lg">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 rounded bg-[#0F9255] text-white disabled:opacity-50`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllNews;
