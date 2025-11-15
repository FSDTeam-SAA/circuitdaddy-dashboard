import React from 'react'
import AddBlog from './AddBlog'
import { PageHeader } from '@/app/(dashboard)/_components/PageHeader'

const page = () => {
  return (
    <div>
      <PageHeader
        title="Blog & FAQ CMS"
        subtitle="Monitor and moderate forum discussions."
      />
      <div className='p-6 mt-6 '>
        <AddBlog />
      </div>
    </div>
  )
}

export default page