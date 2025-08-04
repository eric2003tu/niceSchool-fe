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
<div
  style={{ backgroundImage: `url('showcase-2.webp')` }}
  className="w-full h-[500px] bg-cover bg-center rounded-xl relative shadow-lg"
>
  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-10 py-8 rounded-b-xl">
    <h1 className="text-4xl font-bold mb-2">Experience Campus Life</h1>
    <p className="text-lg">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis
      lacus vel augue laoreet rutrum faucibus dolor auctor.
    </p>
  </div>
</div>

      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {cards.map((card,index)=>(
        <div key={index} className="grid grid-cols-1 py-5 gap-2 w-full bg-white rounded-md justify-items-center text-[#0a0a40] group transition duration-300 transform hover:scale-[1.02]">
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
