import AlumniHero from '@/components/alumni-components/AlumniHero'
import ContactSection from '@/components/contact-components/ContactSection'
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import React from 'react'

const page = () => {
  return (
    <div>
      <header className="fixed top-0 w-full z-50 mb-6">
       <Header/>
      </header>
      <AlumniHero name='Contact'/>
      <ContactSection/>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default page
