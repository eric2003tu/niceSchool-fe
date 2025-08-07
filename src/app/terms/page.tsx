import AlumniHero from '@/components/alumni-components/AlumniHero'
import TermsConditions from '@/components/privacy-components/Terms'
import React from 'react'

const page = () => {
  return (
    <div>
      <AlumniHero name='Terms & Conditions'/>
      <TermsConditions/>
    </div>
  )
}

export default page