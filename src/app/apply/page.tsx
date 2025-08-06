import React from 'react'
import AlumniHero from '@/components/alumni-components/AlumniHero'
// import MultiStepAdmissionForm from '@/components/admissions-components/MultiStepApplicationForm'
import ModernAdmissionForm from '@/components/application-component/ModernAdmissionForm'

const page = () => {
  return (
    <div>
      <AlumniHero name="Apply"/>
      <ModernAdmissionForm/>
    </div>
  )
}

export default page
