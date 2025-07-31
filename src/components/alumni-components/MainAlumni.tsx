import React from 'react'

const MainAlumni = () => {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:px-30 px-4 text-[#0a0a40] w-full max-w-screen">
    <div className="w-full grid justify-items-start grid-cols-1 lg:gap-5 gap-4">
      <h1 className="bg-gray-300 text-[#0F9255] rounded-full text-center lg:p-2 font-bold p-3">Alumni Community</h1>
      <h1 className="text-4xl font-bold">Join Our Global Network of Changemakers</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempus
        , velit vel fringilla venenatis, urna risus volutpat nisi, 
        ac commodo dolor nulla quis lorem. In mattis dictum malesuada.</p>
        <div className="flex flex-row gap-8">
        <h1 className="flex flex-col">
            <span className="text-5xl font-bold text-[#0F9255]">35k+ </span>
            <span className="font-bold">Global Alumnin</span>
        </h1>
                <h1 className="flex flex-col">
            <span className="text-5xl font-bold text-[#0F9255]">142 </span>
            <span className="font-bold">Countries</span>
        </h1>
                <h1 className="flex flex-col">
            <span className="text-5xl font-bold text-[#0F9255]">76 </span>
            <span className="font-bold">Years of Legacy</span>
        </h1>
        </div>
        <button className="text-white font bold text-center text-xl md:my-3 sm:my-3 rounded-full p-3 bg-[#0F9255] group transition duration-300 transform hover:scale-[1.02]">Discover Netwk Benefits</button>
      </div>
      <img src="campus-5.webp" alt="campus" className="w-full rounded-md group transition duration-300 transform hover:scale-[1.02]"/>
    </div>
  )
}

export default MainAlumni
