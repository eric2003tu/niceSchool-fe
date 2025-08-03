import AlumniEvents from '@/src/components/alumni-components/AlumniEvents'
import AlumniHero from '@/src/components/alumni-components/AlumniHero'
import LastingImpact from '@/src/components/alumni-components/LastingImpact'
import MainAlumni from '@/src/components/alumni-components/MainAlumni'
import Spotlight from '@/src/components/alumni-components/Spotlight'
import StayConnected from '@/src/components/alumni-components/StayConnected'
import React from 'react'

const page = () => {
  return (
    <div className='w-screen max-w-screen flex flex-col gap-20'>
      <AlumniHero/>
      <MainAlumni/>
      <Spotlight/>
      <StayConnected/>
      <AlumniEvents/>
      <LastingImpact/>
    </div>
  )
}

export default page
