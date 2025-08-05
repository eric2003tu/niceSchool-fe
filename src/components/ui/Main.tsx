import React from 'react';

const Main = () => {
  return (
    <div className='h-full mb-50 border px-4 lg:px-30'>
      <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Text Section */}
        <div className="w-full py-3">
          <div className='flex flex-col w-full gap-9 justify-items-start'>
            <h1 className='text-[#0a0a40] font-bold text-4xl sm:text-5xl leading-tight'>
              Empowering Minds, <span className='text-[#0F9255]'>Shaping Futures</span>
            </h1>
            <p className='text-[#0a0a40] text-lg sm:text-[20px]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>

            <div className='w-full flex flex-col sm:flex-row gap-3 px-0 sm:px-3'>
              <button className='text-gray-500 font-bold bg-white rounded-md text-[18px] text-center px-7 p-2 cursor-pointer shadow-[#0F9255] shadow-sm transition-all ease-in-out group duration-700 transform hover:scale-[1.02] hover:shadow-xl'>
                <span className="text-2xl text-start font-bold text-[#0a0a40]">25+</span>
                <p>Years</p>
              </button>
              <button className='text-gray-500 font-bold bg-white rounded-md text-[18px] text-center px-7 p-2 cursor-pointer shadow-[#0F9255] shadow-sm transition-all ease-in-out group duration-700 transform hover:scale-[1.02] hover:shadow-xl'>
                <span className="text-2xl text-start font-bold text-[#0a0a40]">5000+</span>
                <p>Students</p>
              </button>
              <button className='text-gray-500 font-bold bg-white rounded-md text-[18px] text-center px-7 p-2 cursor-pointer shadow-[#0F9255] shadow-sm transition-all ease-in-out group duration-700 transform hover:scale-[1.02] hover:shadow-xl'>
                <span className="text-2xl text-start font-bold text-[#0a0a40]">700+</span>
                <p>Faculties</p>
              </button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full py-3 relative">
          <img
            src="campus.webp"
            alt="campus"
            className='w-full h-auto rounded-sm shadow-lg transition duration-700 transform hover:scale-[1.02] hover:shadow-xl'
          />
          <img
            src="students.webp"
            alt='students'
            className="absolute w-3/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md transition duration-700 hover:scale-[1.02] hover:shadow-xl hidden md:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
