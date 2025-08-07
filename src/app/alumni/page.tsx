import AlumniEvents from '@/components/alumni-components/AlumniEvents'
import AlumniHero from '@/components/alumni-components/AlumniHero'
import LastingImpact from '@/components/alumni-components/LastingImpact'
import MainAlumni from '@/components/alumni-components/MainAlumni'
import Spotlight from '@/components/alumni-components/Spotlight'
import StayConnected from '@/components/alumni-components/StayConnected'
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col gap-20'>
      <header className="fixed top-0 w-full z-50 mb-6">
       <Header/>
      </header>
      <AlumniHero name='Alumni'/>
      <MainAlumni/>
      <Spotlight/>
      <StayConnected/>
      <AlumniEvents/>
      <LastingImpact/>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default page
