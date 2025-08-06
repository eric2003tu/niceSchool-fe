import AdmissionsMain from '@/components/admissions-components/AdmissionsMain'
import AlumniHero from '@/components/alumni-components/AlumniHero'
import React from 'react'

const page = () => {
  return (
    <div>
      <AlumniHero name='Admissions'/>
      <AdmissionsMain/>
    </div>
  )
}

export default page
