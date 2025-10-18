import React from 'react'
import DashboardCard from '../_components/DashboardCard'
import ServiceCategories from '../_components/ServiceCategories'
import PlatformGrowth from '../_components/PlatformGrowth'
import ActiveProjects from '../_components/ActiveProjects'
import RecentPendingApprovals from '../_components/RecentPendingApprovals'

const page = () => {
  return (
    <div className='space-y-[24px]'>
      <DashboardCard />
      <div className='grid grid-cols-2 gap-5'>
        <ServiceCategories />
        <PlatformGrowth />
      </div>
      <div className='grid grid-cols-2 gap-5'>
        <RecentPendingApprovals/>
        <ActiveProjects/>
      </div>
    </div>
  )
}

export default page