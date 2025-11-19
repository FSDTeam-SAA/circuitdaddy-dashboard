import React from 'react'
import { PageHeader } from '../../_components/PageHeader'
import ServicesTable from './_components/Services'

const page = () => {
    return (
        <div>
            <PageHeader
                title="Services"
                subtitle="Review all administrative actions taken on the platform."
            />
            <div className='p-6 mt-6'>
                <ServicesTable/>
            </div>
        </div>
    )
}

export default page