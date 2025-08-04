import { HouseIcon, TrophyIcon, User2 } from 'lucide-react';
import React from 'react'
import { MdEvent } from 'react-icons/md';

const StudentsMain = () => {
  const cards = [
    {title:'Clubs', icon:<User2 size={30}/>, data: '50+ Organisations'},
    {title: "Athletics", icon:<TrophyIcon size={30}/>, data: '15+ Sport Teams'},
    {title: 'Events', icon:<MdEvent size={30}/>, data:'200+ Annual Events'},
    {title: 'Housing', icon: <HouseIcon size={30}/>, data: '10 Residence Halls'}
  ]
  return (
    <div className='grid grid-cols-1 w-full lg:px-30 px-4 justify-items-center mt-10 gap-7'>
      <div style={{backgroundImage: `url(${'showcase-2.webp'})`}} className='w-full grid h-120 bg-contain rounded-md justify-items-bottom'>
       <div className="grid grid-cols-1 justify-items-bottom  h-full self-start p-3 rounded-md bg-gray-600/60 text-white font-bold ">
       <h1 className='text-3xl'>Experience Campus Life</h1>
       </div>
      </div>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {cards.map((card,index)=>(
        <div key={index} className="grid grid-cols-1 py-5 gap-2 w-full bg-white rounded-md justify-items-center text-[#0a0a40]">
          <div className="w-fit text-[#0F9255] bg-green-200 text-center rounded-full p-3 hover:text-white hover:bg-[#0F9255]">
            {card.icon}
          </div>
          <h1 className="text-2xl font-semibold">{card.title}</h1>
          <p>{card.data}</p>
        </div>
        ))}
      </div>
    </div>
  )
}

export default StudentsMain;
