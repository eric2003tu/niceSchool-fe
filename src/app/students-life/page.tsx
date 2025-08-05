import React from 'react'
import AlumniHero from '@/src/components/alumni-components/AlumniHero'
import StudentsMain from '@/src/components/students-components/StudentsMain'
import Filters from '@/src/components/students-components/Filters'
import LifeOnCampus from '@/src/components/students-components/LifeOnCampus'

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
