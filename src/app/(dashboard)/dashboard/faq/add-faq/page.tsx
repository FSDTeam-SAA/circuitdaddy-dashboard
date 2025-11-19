import React from 'react'
import AddFaqForm from '../_components/FaqForm'
import { PageHeader } from '@/app/(dashboard)/_components/PageHeader'

const page = () => {
  return (
    <div>
         <PageHeader
                title="Add FAQ"
                subtitle="Manage your account preferences, security settings, and privacy options."
              />
              <div className='p-6 mt-6 '>
        <AddFaqForm/>
              </div>
    </div>
  )
}

export default page