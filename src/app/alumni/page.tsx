import AlumniHero from '@/src/components/alumni-components/AlumniHero'
import MainAlumni from '@/src/components/alumni-components/MainAlumni'
import React from 'react'

const page = () => {
  return (
    <div className='w-screen max-w-screen flex flex-col gap-10'>
      <AlumniHero/>
      <MainAlumni/>
    </div>
  )
}

export default page
