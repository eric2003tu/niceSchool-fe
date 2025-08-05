import AlumniHero from '@/components/alumni-components/AlumniHero'
import AllEvents from '@/components/events-components/AllEvents'
import React from 'react'

const page = () => {
  return (
    <div className="w-full">
      <AlumniHero name='Events'/>
      <AllEvents/>
    </div>
  )
}

export default page
