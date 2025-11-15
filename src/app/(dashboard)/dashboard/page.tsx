import React from 'react'
import DashboardCard from '../_components/DashboardCard'
import ServiceCategories from '../_components/ServiceCategories'
import PlatformGrowth from '../_components/PlatformGrowth'
import ActiveProjects from '../_components/ActiveProjects'
import RecentPendingApprovals from '../_components/RecentPendingApprovals'
import { PageHeader } from '../_components/PageHeader'

const page = () => {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to the Talent Badger admin console."
      />
      <div className='p-6 mt-6 '>
        <div className='space-y-[24px]'>
          <DashboardCard />
          <div className='grid grid-cols-2 gap-5'>
            <ServiceCategories />
            <PlatformGrowth />
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <RecentPendingApprovals />
            <ActiveProjects />
          </div>
        </div>
      </div>
    </div>

  )
}

export default page