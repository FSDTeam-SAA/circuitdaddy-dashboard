import React from 'react'
import { SideSetting } from '../_components/SideSetting'
import PasswordChange from '../_components/PasswordChnage'
import { PageHeader } from '@/app/(dashboard)/_components/PageHeader'

const page = () => {
  return (
    <div>
      <PageHeader
        title="Changes Password"
        subtitle="Manage your account preferences, security settings, and privacy options."
      />
      <div className='p-6 mt-6 '>

        <div className='flex gap-6'>
          <SideSetting />
          <PasswordChange />
        </div>
      </div>
    </div>
  )
}

export default page