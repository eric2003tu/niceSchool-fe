import AlumniEvents from '@/components/alumni-components/AlumniEvents'
import AlumniHero from '@/components/alumni-components/AlumniHero'
import LastingImpact from '@/components/alumni-components/LastingImpact'
import MainAlumni from '@/components/alumni-components/MainAlumni'
import Spotlight from '@/components/alumni-components/Spotlight'
import StayConnected from '@/components/alumni-components/StayConnected'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col gap-20'>
      <AlumniHero name='Alumni'/>
      <MainAlumni/>
      <Spotlight/>
      <StayConnected/>
      <AlumniEvents/>
      <LastingImpact/>
    </div>
  )
}

export default page
