import AlumniHero from '@/components/alumni-components/AlumniHero'
import PrivacyPolicy from '@/components/privacy-components/Privacy'
import React from 'react'
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const page = () => {
  return (
    <div>
      <header className="fixed top-0 w-full z-50 mb-6">
       <Header/>
      </header>
      <AlumniHero name='Privacy'/>
      <PrivacyPolicy/>
    </div>
  )
}

export default page
