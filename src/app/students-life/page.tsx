import React from 'react'
import AlumniHero from '@/components/alumni-components/AlumniHero'
import StudentsMain from '@/components/students-components/StudentsMain'
import Filters from '@/components/students-components/Filters'
import LifeOnCampus from '@/components/students-components/LifeOnCampus'
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const page = () => {
  return (
    <div className='w-full'>
      <header className="fixed top-0 w-full z-50 mb-6">
       <Header/>
      </header>
      <AlumniHero name='Students-life'/>
      <StudentsMain/>
      <Filters/>
      <LifeOnCampus/>
    </div>
  )
}

export default page
