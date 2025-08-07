import AlumniHero from '@/components/alumni-components/AlumniHero'
import AllEvents from '@/components/events-components/AllEvents'
import React from 'react'
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const page = () => {
  return (
    <div className="w-full">
      <header className="fixed top-0 w-full z-50 mb-6">
       <Header/>
      </header>
      <AlumniHero name='Events'/>
      <AllEvents/>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default page
