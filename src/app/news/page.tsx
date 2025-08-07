import AlumniHero from '@/components/alumni-components/AlumniHero'
import AllNews from '@/components/news-components/AllNews'
import News from '@/components/ui/News'
import React from 'react'
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const page = () => {
  return (
    <div className='w-full'>
      <header className="fixed top-0 w-full z-50 mb-6">
       <Header/>
      </header>
      <AlumniHero name='News'/>
      <AllNews/>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default page
