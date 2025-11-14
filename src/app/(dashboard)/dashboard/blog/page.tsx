import React from 'react'
import ListOfBlog from './_components/ListOfBlog'
import { PageHeader } from '../../_components/PageHeader'

const page = () => {
  return (
    <div>
        <PageHeader
        title="Blog & FAQ CMS"
        subtitle="Monitor and moderate forum discussions."
      />
      <div className='p-6 mt-6'>
      <ListOfBlog/>
      </div>
    </div>
  )
}

export default page