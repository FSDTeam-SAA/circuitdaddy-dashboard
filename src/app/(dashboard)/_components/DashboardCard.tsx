"use client"
import { Card, CardContent } from '@/components/ui/card'
import { useGetAllOverview } from '@/hooks/apiCalling'
import { Box, ClockFading, User2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

const DashboardCard = () => {
    const { data: session } = useSession();
    const token = (session?.user as { accessToken: string })?.accessToken;
    const statch = useGetAllOverview(token as string)

    return (
        <div>
            <div className='grid grid-cols-4 gap-5'>
                <Card className='py-9 px-4'>
                    <CardContent className='flex justify-between items-center'>
                        <div className='space-y-[6px]'>
                            <p className='text-[#6B7280] font-medium text-[12px]'>Total Active Users</p>
                            <p className='text-[#1F2937] font-medium  text-[20px]'>{statch?.data?.data.totaActivelUser}</p>
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
                            <p className='text-[#1F2937] font-medium  text-[20px]'>{statch?.data?.data.totalActiveProject}</p>
                        </div>
                        <div className='bg-[#E8F1F1] p-2 rounded-lg text-[#147575]'>
                            <User2 />
                        </div>
                    </CardContent>
                </Card>
                <Card className='py-9 px-4'>
                    <CardContent className='flex justify-between items-center'>
                        <div className='space-y-[6px]'>
                            <p className='text-[#6B7280] font-medium text-[12px]'>Pending Project</p>
                            <p className='text-[#1F2937] font-medium  text-[20px]'>{statch?.data?.data.totalPandingProject}</p>
                        </div>
                        <div className='bg-[#E8F1F1] p-2 rounded-lg text-[#147575]'>
                            <ClockFading />
                        </div>
                    </CardContent>
                </Card>
                <Card className='py-9 px-4'>
                    <CardContent className='flex justify-between items-center'>
                        <div className='space-y-[6px]'>
                            <p className='text-[#6B7280] font-medium text-[12px]'>Total Completed Project</p>
                            <p className='text-[#1F2937] font-medium  text-[20px]'>{statch?.data?.data.totalCompletedProject}</p>
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