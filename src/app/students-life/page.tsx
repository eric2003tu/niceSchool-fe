import React from 'react'
import AlumniHero from '@/src/components/alumni-components/AlumniHero'
import StudentsMain from '@/src/components/students-components/StudentsMain'
import Filters from '@/src/components/students-components/Filters'

const page = () => {
  return (
    <div className='w-full'>
      <AlumniHero name='Students-life'/>
      <StudentsMain/>
      <Filters/>
    </div>
  )
}

export default page
