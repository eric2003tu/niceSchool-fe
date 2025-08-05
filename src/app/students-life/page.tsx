import React from 'react'
import AlumniHero from '@/components/alumni-components/AlumniHero'
import StudentsMain from '@/components/students-components/StudentsMain'
import Filters from '@/components/students-components/Filters'
import LifeOnCampus from '@/components/students-components/LifeOnCampus'

const page = () => {
  return (
    <div className='w-full'>
      <AlumniHero name='Students-life'/>
      <StudentsMain/>
      <Filters/>
      <LifeOnCampus/>
    </div>
  )
}

export default page
