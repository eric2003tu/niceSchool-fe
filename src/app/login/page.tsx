import AlumniHero from '@/components/alumni-components/AlumniHero'
import LoginForm from '@/components/ui/Login'
import React from 'react'
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const page = () => {
  return (
    <div>
      <header className="fixed top-0 w-full z-50 mb-6">
       <Header/>
      </header>
        {/* <AlumniHero name="Login"/> */}
      <LoginForm/>
    </div>
  )
}

export default page
