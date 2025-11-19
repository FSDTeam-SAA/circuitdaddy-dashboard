import React from 'react'
import IndustriesTable from './_components/Industries'
import { PageHeader } from '../../_components/PageHeader'

const page = () => {
    return (
        <div>
            <PageHeader
                title="Industries"
                subtitle="Review all administrative actions taken on the platform."
            />
            <div className='p-6 mt-6'>
                <IndustriesTable />
            </div>
        </div>
    )
}

export default page