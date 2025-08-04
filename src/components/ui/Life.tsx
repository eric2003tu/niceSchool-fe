import { Globe, Music, Trophy, Users2 } from 'lucide-react'
import Link from "next/link";
import React from 'react'

const Life = () => {
  return (
    <div className='w-full max-w-screen lg:px-30 px-4 grid grid-cols-1 text-[#0a0a40] py-10 justify-items-center'>
        <h1 className="text-4xl font-bold">Student's Life</h1>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-6 gap-5 justify-self-center h-fit">
            <img src="education-square-11.webp" alt="education" className=' rounded-lg group transition duration-300 transform hover:scale-[1.02]'/>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 pt-16 h-fit">
            <div className="relative group overflow-hidden rounded-md border shadow-lg p-4 bg-white group transition duration-300 transform h-fit hover:scale-[1.02] hover:shadow-xl">
              {/* Background overlay */}
              <div className="absolute inset-0  translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
            
              {/* Content layer */}
              <div className="relative z-10 grid grid-cols-1 gap-3 transition-all duration-300 group-hover:scale-[1.01]">
                
                <div className="bg-green-200 rounded-full w-fit p-4 text-center  text-[#0F9255] transition-all duration-300 group-hover:bg-[#0F9255] group-hover:text-white">
                  <Users2 size={32} />
                </div>
            
                <h1 className="text-[#0a0a40] text-2xl">
                  Student Clubs
                </h1>
            
                <p className="text-[#0a0a40] ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam purus.


                </p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-md border shadow-lg p-4 bg-white  group transition duration-300 h-fit transform hover:scale-[1.02] hover:shadow-xl">
              {/* Background overlay */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
            
              {/* Content layer */}
              <div className="relative z-10 grid grid-cols-1 gap-3 transition-all duration-300 group-hover:scale-[1.01]">
                
                <div className="bg-green-200 rounded-full w-fit p-4 text-center text-[#0F9255] transition-all duration-300 group-hover:bg-[#0F9255] group-hover:text-white">
                  <Trophy size={32} />
                </div>
            
                <h1 className="text-[#0a0a40] text-2xl">
                  Sports Events
                </h1>
            
                <p className="text-[#0a0a40]">
                    Quis nostrud exercitation ullamco laboris nisi 
                    ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-md border shadow-lg p-4 bg-white  group transition h-fit duration-300 transform hover:scale-[1.02] hover:shadow-xl">
              {/* Background overlay */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
            
              {/* Content layer */}
              <div className="relative z-10 grid grid-cols-1 gap-3 transition-all duration-300 group-hover:scale-[1.01]">
                
                <div className="bg-green-200 rounded-full w-fit p-4 text-center text-[#0F9255] transition-all duration-300 group-hover:bg-[#0F9255] group-hover:text-white">
                  <Music size={32} />
                </div>
            
                <h1 className="text-[#0a0a40] text-2xl">
                  Arts & Culture
                </h1>
            
                <p className="text-[#0a0a40]">
                    Duis aute irure dolor in reprehenderit
                     in voluptate velit esse cillum dolore.
                </p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-md border shadow-lg p-4 bg-white  group transition duration-300 h-fit transform hover:scale-[1.02] hover:shadow-xl">
              {/* Background overlay */}
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
            
              {/* Content layer */}
              <div className="relative z-10 grid grid-cols-1 gap-3 transition-all duration-300 group-hover:scale-[1.01]">
                
                <div className="bg-green-200 rounded-full w-fit p-4 text-center text-[#0F9255] transition-all duration-300 group-hover:bg-[#0F9255] group-hover:text-white">
                  <Globe size={32} />
                </div>
            
                <h1 className="text-[#0a0a40] text-2xl">
                  Global Experiences
                </h1>
            
                <p className="text-[#0a0a40] ">
                    Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia.
                </p>
              </div>
            </div>
                <Link href='students-life' className='text-white font-semibold bg-[#0F9255] text-center px-3  py-2 rounded-md text-xl cursor-pointer hover:bg-green-600 transition-all  ease-in-out group duration-300 transform hover:scale-[1.02] hover:shadow-xl'>
                View All Students Activities
            </Link>
            </div>
        </div>
    </div>
  )
}

export default Life
