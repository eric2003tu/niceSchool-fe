import AlumniHero from '@/src/components/alumni-components/AlumniHero'
import AllNews from '@/src/components/news-components/AllNews'
import News from '@/src/components/ui/News'
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
