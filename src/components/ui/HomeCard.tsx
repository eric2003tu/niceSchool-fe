import { Eye, Star } from 'lucide-react'
import React from 'react'
import { GrDeploy } from 'react-icons/gr'

const HomeCard = () => {
  return (
<div className='max-w-full lg:px-30 px-4 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-20 py-10'>
<div className="relative group overflow-hidden rounded-md border shadow-lg p-4 bg-white group transition duration-700 transform hover:scale-[1.02] hover:shadow-xl">
  {/* Background overlay */}
  <div className="absolute inset-0 bg-[#0F9255] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

  {/* Content layer */}
  <div className="relative z-10 grid grid-cols-1 gap-3 transition-all duration-700 group-hover:scale-[1.01]">
    
    <div className="bg-green-200 rounded-full w-fit p-4 text-center text-[#0F9255] transition-all duration-700 group-hover:bg-white group-hover:text-[#0F9255]">
      <GrDeploy size={32} />
    </div>

    <h1 className="text-[#0a0a40] text-2xl group-hover:text-white transition-colors duration-700">
      Our Values
    </h1>

    <p className="text-[#0a0a40] group-hover:text-white transition-colors duration-700">
      Excepteur sint occaecat cupidatat non proident, sunt in culpa 
      qui officia deserunt mollit anim id est laborum consectetur adipiscing elit.
    </p>
  </div>
</div>

<div className="relative group overflow-hidden rounded-md border shadow-lg p-4 bg-white  group transition duration-700 transform hover:scale-[1.02] hover:shadow-xl">
  {/* Background overlay */}
  <div className="absolute inset-0 bg-[#0F9255] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

  {/* Content layer */}
  <div className="relative z-10 grid grid-cols-1 gap-3 transition-all duration-700 group-hover:scale-[1.01]">
    
    <div className="bg-green-200 rounded-full w-fit p-4 text-center text-[#0F9255] transition-all duration-700 group-hover:bg-white group-hover:text-[#0F9255]">
      <Eye size={32} />
    </div>

    <h1 className="text-[#0a0a40] text-2xl group-hover:text-white transition-colors duration-700">
      Our Vision
    </h1>

    <p className="text-[#0a0a40] group-hover:text-white transition-colors duration-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.
    </p>
  </div>
</div>

<div className="relative group overflow-hidden rounded-md border shadow-lg p-4 bg-white  group transition duration-700 transform hover:scale-[1.02] hover:shadow-xl">
  {/* Background overlay */}
  <div className="absolute inset-0 bg-[#0F9255] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

  {/* Content layer */}
  <div className="relative z-10 grid grid-cols-1 gap-3 transition-all duration-700 group-hover:scale-[1.01]">
    
    <div className="bg-green-200 rounded-full w-fit p-4 text-center text-[#0F9255] transition-all duration-700 group-hover:bg-white group-hover:text-[#0F9255]">
      <Star size={32} />
    </div>

    <h1 className="text-[#0a0a40] text-2xl group-hover:text-white transition-colors duration-700">
      Our Mision
    </h1>

    <p className="text-[#0a0a40] group-hover:text-white transition-colors duration-700">
        Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.
    </p>
  </div>
</div>

    </div>
  )
}

export default HomeCard
