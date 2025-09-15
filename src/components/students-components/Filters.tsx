'use client'
import React, {useState} from 'react'
import { User2, Trophy, LifeBuoy } from 'lucide-react';
import { MdApartment } from 'react-icons/md';
import Clubs from './Clubs';
import Athletics from './Athletics';
import Support from './Support';
import Facilities from './Facilities';

const Filters = () => {
    const [currentFilter, setCurrentFilter] = useState<string>('Clubs')
  return (
    <div className=" w-full lg:px-30 px-4 mt-8">
<div className="w-fit p-2 rounded-full bg-blue-100 text-xl grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2">
  <button className={`flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer  rounded-full ${currentFilter=== 'Clubs' ? 'bg-green-600 text-white' : 'text-green-900 hover:bg-green-200'} `} onClick={()=>{
    setCurrentFilter('Clubs')
  }}>
    <User2 size={22} />
    <span>Clubs & Organizations</span>
  </button>

  <button className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full font-semibold text-center ${currentFilter=== 'Athletics' ? 'bg-green-600 text-white' : 'text-green-900 hover:bg-green-200'} `} onClick={()=>{
    setCurrentFilter('Athletics')
  }}>
    <Trophy size={22} />
    <span>Athletics</span>
  </button>

  <button className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer font-semibold  ${currentFilter=== 'Facilities' ? 'bg-green-600 text-white' : 'text-green-900 hover:bg-green-200'} `} onClick={()=>{
    setCurrentFilter('Facilities')
  }} >
    <MdApartment size={22} />
    <span>Campus Facilities</span>
  </button>

  <button className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer font-semibold  ${currentFilter=== 'Support' ? 'bg-green-600 text-white' : 'text-green-900 hover:bg-green-200'}`}onClick={()=>{
    setCurrentFilter('Support')
  }}>
    <LifeBuoy size={22} />
    <span>Support Services</span>
  </button>
</div>
<div className="w-full mt-4">
  {currentFilter === 'Clubs' ? <Clubs/> : currentFilter === 'Athletics' ? <Athletics/> : currentFilter === 'Facilities' ? <Facilities/> : <Support/>}
</div>
    </div>
  )
}

export default Filters
