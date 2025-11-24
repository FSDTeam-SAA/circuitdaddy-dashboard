import React from 'react'
import LevelApprovePage from './_components/levelApprove'
import { PageHeader } from '../../_components/PageHeader'

const page = () => {
    return (
        <div>
            <PageHeader
                title="Badge Level Approve Requests"
                subtitle="Customize your dashboard experience and preferences."
            />
            <div className='p-6 mt-6 '>

                <LevelApprovePage />
            </div>
        </div>
    )
}

export default page