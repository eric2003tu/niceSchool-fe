import { Building2, Globe, GraduationCap, Trophy } from 'lucide-react'
import React from 'react'

const Hero = () => {
  return (
      <div className='w-full h-fit px-4 lg:px-24 lg:pt-50 pt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center self-center'>
        {/* Left Section */}
        <div className='flex flex-col lg:gap-6 gap-2 '>
          <h1 className='text-white font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight'>
            Empowering Futures Through Education
          </h1>
          <p className='text-white text-lg sm:text-xl'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam ornare, 
            imperdiet est eget, pretium augue. Nullam auctor felis in nibh gravida, 
            eu viverra risus egestas.
          </p>
          <div className='flex flex-wrap gap-3'>
            <button className='text-white font-bold bg-[#0F9255] px-4 py-2 rounded-md text-lg sm:text-xl hover:bg-green-600 transition duration-300 transform hover:scale-[1.02] hover:shadow-xl'>
              Start Your Journey
            </button>
            <button className='text-white font-bold bg-gray-700/80 px-4 py-2 rounded-md text-lg sm:text-xl hover:bg-gray-600 transition duration-300 transform hover:scale-[1.02] hover:shadow-xl'>
              Discover programs
            </button>
          </div>
        </div>

        {/* Right Section: Stats */}
        <div className="bg-gray-800/40 lg:py-10 py-5 px-6 text-center rounded-md text-white group transition duration-300 transform hover:scale-[1.02]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Why Choose Us</h2>
          <div className="w-20 h-1 bg-[#0F9255] mx-auto mb-8 rounded"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-6 gap-2 max-w-4xl mx-auto">
            {/* Item */}
            {[
              { icon: <Trophy size={32} />, title: '98%', subtitle: 'Graduate Employment' },
              { icon: <Globe size={32} />, title: '45+', subtitle: 'International Partners' },
              { icon: <GraduationCap size={32} />, title: '15:1', subtitle: 'Student-Faculty Ratio' },
              { icon: <Building2 size={32} />, title: '120+', subtitle: 'Degree Programs' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-[#0F9255] p-4 rounded-lg">{item.icon}</div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-sm">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Hero
