import React from 'react'
import AlumniHero from '@/src/components/alumni-components/AlumniHero'
import StudentsMain from '@/src/components/students-components/StudentsMain'

const page = () => {
  return (
    <div className='w-full'>
      <AlumniHero name='Students-life'/>
      <StudentsMain/>
    </div>
  )
}

export default page
