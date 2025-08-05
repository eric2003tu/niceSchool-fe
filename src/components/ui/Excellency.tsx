import React from 'react'
import {Users2,User, Watch, Camera } from 'lucide-react'

const Excellency = () => {

  const ap = [
  {
    image: 'education-1.webp',
    title: 'Top-Ranked Programs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ultricies magna.',
  },
  {
    image: 'education-2.webp',
    title: 'Top-Ranked Programs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ultricies magna.',
  },
  {
    image: 'education-3.webp',
    title: 'Top-Ranked Programs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ultricies magna.',
  },
];
  return (
    <div className='w-full lg:lg:px-30 px-4 my-10'>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 w-full text-[#0a0a40]">
        <div className="w-full grid grid-cols-1 gap-6 h-fit mt-18">
            <h1 className='text-4xl font-bold'>Excellence in Education for Over 50 Years</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ultricies magna. Maecenas finibus convallis turpis, non facilisis justo egestas in. Nulla facilisi. Fusce consectetur, enim eget aliquet volutpat, lacus nulla semper velit.</p>
            <div className="flex flex-row gap-3">
                <button className="text-white text-xl font-bold text-center bg-[#0F9255] p-2 px-4 rounded-md cursor-pointergroup transition duration-700 transform hover:scale-[1.02] hover:shadow-xl ">Learn More</button>
                <button className="border-[#0a0a40] border text-xl font-bold text-center p-2 px-4 rounded-md cursor-pointer group transition duration-700 transform hover:scale-[1.02] hover:shadow-xl hover:border-[#0F9255] hover hover:text-[#0F9255]">Vitual Tour</button>
            </div>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 w-full gap-8">
            <div className="grid grid-cols-1 p-3 justify-items-center h-50 gap-2 hover:shadow-2xl rounded-md shadow-xl bg-white group transition duration-700 transform hover:scale-[1.02]">
                <Users2 size={40} className="text-[#0F9255]"/>
                <h1 className="text-4xl font-bold">92%</h1>
                <p className="font-bold">Graduation Rate</p>
            </div>
                <div className="grid grid-cols-1 p-3 justify-items-center h-50 gap-2 hover:shadow-2xl rounded-md shadow-xl bg-white group transition duration-700 transform hover:scale-[1.02]">
                <User size={40} className="textg-"/>
                <h1 className="text-4xl font-bold">15:1</h1>
                <p className="font-bold">Student-Faculty Ratio</p>
            </div>
                <div className="grid grid-cols-1 p-3 justify-items-center h-50 gap-2 hover:shadow-2xl rounded-md shadow-xl bg-white group transition duration-700 transform hover:scale-[1.02]">
                <Watch size={40} className="text-[#0F9255]"/>
                <h1 className="text-4xl font-bold">125+</h1>
                <p className="font-bold">Academic Programs</p>
            </div>
                <div className="grid grid-cols-1 p-3 justify-items-center h-50 gap-2 hover:shadow-2xl rounded-md shadow-xl bg-white group transition duration-700 transform hover:scale-[1.02]">
                <Camera size={40} className="text-[#0F9255]"/>
                <h1 className="text-4xl font-bold">$42M</h1>
                <p className="font-bold">Research Funding</p>
            </div>
        </div>
      </div>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 w-full text-white mt-7 text-xl">
      {ap.map((item, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${item.image})` }}
          className="grid grid-cols-1 w-full bg-cover bg-no-repeat h-64 rounded-md justify-items-bottom group transition duration-700 transform hover:scale-[1.02]"
        >
          <div className="grid justify-self-end self-end p-3 rounded-md bg-gray-600/60">
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>

    </div>
  )
}
export default Excellency
