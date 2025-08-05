import AlumniHero from '@/components/alumni-components/AlumniHero'
import AllNews from '@/components/news-components/AllNews'
import News from '@/components/ui/News'
import React from 'react'

const page = () => {
  return (
    <div className='w-full'>
      <AlumniHero name='News'/>
      <AllNews/>
    </div>
  )
}

export default page
