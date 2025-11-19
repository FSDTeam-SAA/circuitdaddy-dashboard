import React from 'react'
import { UserManagementTable } from './_Components/userMangementBody'
import { PageHeader } from '../../_components/PageHeader'

const page = () => {
  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Manage and approve platform users."
      />
      <div className='p-6 mt-6'>

        <UserManagementTable />
      </div>
    </div>
  )
}

export default page