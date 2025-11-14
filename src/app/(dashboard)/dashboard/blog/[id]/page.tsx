import React from 'react'
import EditBlog from '../_components/EditBlog'
import { PageHeader } from '@/app/(dashboard)/_components/PageHeader'

const page = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <PageHeader
                title="Blog & FAQ CMS"
                subtitle="Monitor and moderate forum discussions."
            />
            <div className='p-6 mt-6 '>
                <EditBlog id={params.id} />
            </div>
        </div>
    )
}

export default page