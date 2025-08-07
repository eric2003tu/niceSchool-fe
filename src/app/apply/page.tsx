import React from 'react'
import AlumniHero from '@/components/alumni-components/AlumniHero'
// import MultiStepAdmissionForm from '@/components/admissions-components/MultiStepApplicationForm'
import ModernAdmissionForm from '@/components/application-component/ModernAdmissionForm'
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const page = () => {
  return (
    <div>
      <header className="fixed top-0 w-full z-50 mb-6">
       <Header/>
      </header>
      <AlumniHero name="Apply"/>
      <ModernAdmissionForm/>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default page
