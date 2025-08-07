import AdmissionsMain from '@/components/admissions-components/AdmissionsMain'
import AlumniHero from '@/components/alumni-components/AlumniHero'
import React from 'react'
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const page = () => {
  return (
    <div>
      <header className="fixed top-0 w-full z-50 mb-6">
        <Header/>
      </header>
      <AlumniHero name='Admissions'/>
      <AdmissionsMain/>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default page
