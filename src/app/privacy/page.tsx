import AlumniHero from '@/components/alumni-components/AlumniHero'
import PrivacyPolicy from '@/components/privacy-components/Privacy'
import React from 'react'

const page = () => {
  return (
    <div>
      <AlumniHero name='Privacy'/>
      <PrivacyPolicy/>
    </div>
  )
}

export default page
