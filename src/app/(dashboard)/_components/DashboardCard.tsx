import { Card, CardContent } from '@/components/ui/card'
import { Box, ClockFading, User2 } from 'lucide-react'
import React from 'react'

const DashboardCard = () => {
    return (
        <div>
            <div className='grid grid-cols-4 gap-5'>
                <Card className='py-9 px-4'>
                    <CardContent className='flex justify-between items-center'>
                        <div className='space-y-[6px]'>
                            <p className='text-[#6B7280] font-medium text-[12px]'>Total Users</p>
                            <p className='text-[#1F2937] font-medium  text-[20px]'>3,721</p>
                        </div>
                        <div className='bg-[#E8F1F1] p-2 rounded-lg text-[#147575]'>
                            <User2 />
                        </div>
                    </CardContent>
                </Card>
                <Card className='py-9 px-4'>
                    <CardContent className='flex justify-between items-center'>
                        <div className='space-y-[6px]'>
                            <p className='text-[#6B7280] font-medium text-[12px]'>Active Projects</p>
                            <p className='text-[#1F2937] font-medium  text-[20px]'>248</p>
                        </div>
                        <div className='bg-[#E8F1F1] p-2 rounded-lg text-[#147575]'>
                            <User2 />
                        </div>
                    </CardContent>
                </Card>
                <Card className='py-9 px-4'>
                    <CardContent className='flex justify-between items-center'>
                        <div className='space-y-[6px]'>
                            <p className='text-[#6B7280] font-medium text-[12px]'>Pending Approvals</p>
                            <p className='text-[#1F2937] font-medium  text-[20px]'>18</p>
                        </div>
                        <div className='bg-[#E8F1F1] p-2 rounded-lg text-[#147575]'>
                            <ClockFading />
                        </div>
                    </CardContent>
                </Card>
                <Card className='py-9 px-4'>
                    <CardContent className='flex justify-between items-center'>
                        <div className='space-y-[6px]'>
                            <p className='text-[#6B7280] font-medium text-[12px]'>Total Services</p>
                            <p className='text-[#1F2937] font-medium  text-[20px]'>10</p>
                        </div>
                        <div className='bg-[#E8F1F1] p-2 rounded-lg text-[#147575]'>
                            <Box />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardCard