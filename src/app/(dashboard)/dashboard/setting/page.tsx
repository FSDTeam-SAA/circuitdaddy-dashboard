import { Key, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { PageHeader } from '../../_components/PageHeader'

const page = () => {
  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Customize your dashboard experience and preferences."
      />
      <div className='p-6 mt-6 '>
        <div className='bg-[#E8F1F1]  space-y-[16px] p-2 border border-[#E7E7E7] rounded-lg'>
          <Link href={'/dashboard/setting/profile'} className='flex gap-6 cursor-pointer rounded-lg py-[18px] bg-[#F8F9FA] px-[16px] text-[#147575] font-semibold text-[14px]'>
            <User /> Profile
          </Link>
          <Link href={'/dashboard/setting/password'} className='flex gap-6 cursor-pointer rounded-lg py-[18px] bg-[#F8F9FA] px-[16px] text-[#147575] font-semibold text-[14px]'>
            <Key /> Password
          </Link>

        </div>
      </div>
    </div>
  )
}

export default page