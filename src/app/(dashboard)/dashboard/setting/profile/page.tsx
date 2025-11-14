import React from 'react'
import PersonalInfo from '../_components/PersonalInfo'
import { SideSetting } from '../_components/SideSetting'
import { PageHeader } from '@/app/(dashboard)/_components/PageHeader'

const page = () => {
  return (
    <div>
      <PageHeader
        title="Personal Information"
        subtitle="Manage your personal information and profile details."
      />
      <div className='p-6 mt-6 '>

        <div className='flex gap-6'>
          <SideSetting />
          <PersonalInfo />
        </div>
      </div>
    </div>
  )
}

export default page