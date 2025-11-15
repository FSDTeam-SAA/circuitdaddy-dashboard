import React from 'react'
import EditFaq from './editFaq'
import { PageHeader } from '@/app/(dashboard)/_components/PageHeader'

const page = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <PageHeader
                title=" FAQ Edit"
                subtitle="Manage your account preferences, security settings, and privacy options."
            />
            <div className='p-6 mt-6 '>
                <EditFaq id={params.id} />
            </div>
        </div>
    )
}

export default page