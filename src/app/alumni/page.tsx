import AlumniHero from '@/src/components/alumni-components/AlumniHero'
import MainAlumni from '@/src/components/alumni-components/MainAlumni'
import Spotlight from '@/src/components/alumni-components/Spotlight'
import React from 'react'

const page = () => {
  return (
    <div className='w-screen max-w-screen flex flex-col gap-20'>
      <AlumniHero/>
      <MainAlumni/>
      <Spotlight/>
    </div>
  )
}

export default page
