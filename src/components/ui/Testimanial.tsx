"use client";
import { relative } from 'path';
import React from 'react'
import { PiQuotes } from 'react-icons/pi';

const Testimanial = () => {
    const testimonial = [
        {id: 1, message: 'Implementing innovative strategies has revolutionized our approach to market challenges and competitive positioning.', photo: "person-f-2.webp", name:'Rachel Bennet', position: "Strategy Director"},
        {id: 2, message:"Exceptional service delivery and innovative solutions have transformed our business operations, leading to remarkable growth and enhanced customer satisfaction across all touchpoints.", photo: "person-m-2.webp", name: "Daniel Morgan", position: "Chief Innovation Officer"},
        {id: 3, message: "Strategic partnership has enabled seamless digital transformation and operational excellence", photo: "person-f-3.webp", name: "Emma Thompson", position: "Digital Lead"}, 
        {id: 4, message: "Professional expertise and dedication have significantly improved our project delivery timelines and quality metrics.", photo: "person-m-3.webp", name: "Christopher Lee", position: "Technical Director"},
        {id: 5, message: "Collaborative approach and industry expertise have revolutionized our product development cycle, resulting in faster time-to-market and increased customer engagement levels.", photo: "person-f-5.webp", name: "Olivia Carter", position: "Product Manager"}, 
        {id: 6, message: "Innovative approach to user experience design has significantly enhanced our platform's engagement metrics and customer retention rates.", photo: "person-m-5.webp", name: "Nathan Brooks", position: "UX Director"}
    ]
  return (
    <div className='w-full max-w-screen lg:px-30 px-4 text-[#0a0a40] py-10 lg:justify-items-center'>
      <h1 className="text-4xl font-bold">Testimonials</h1>
      <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7 my-7'>
        {testimonial.map((testimal,index)=>(
            <div key={index} className={`relative grid grid-cols-1 gap-3 border border-[#0F9255] ${testimal.id %2 === 0 ? 'bg-green-100' : 'bg-white'} text-[#0a0a40] rounded-lg p-6 justify-items-start group transition duration-300 transform hover:scale-[1.02] hover:shadow-xl`}>
                <p>{testimal.message}</p>
                <div className="flex flex-row gap-6">
                    <img src={testimal.photo} alt={testimal.name} className="rounded-full w-10 h-10"/>
                    <div className="grid grid-cols-1 ">
                        <h1 className="font-bold">{testimal.name}</h1>
                        <p className="text-gray-600">{testimal.position}</p>
                    </div>
                </div>
                <div className='absolute top-[-15px] left-2 text-white bg-green-500 rounded-full justify-items-center p-2 group transition duration-300 transform hover:scale-[1.02] hover:shadow-xl'>
                <PiQuotes size={20} />
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Testimanial