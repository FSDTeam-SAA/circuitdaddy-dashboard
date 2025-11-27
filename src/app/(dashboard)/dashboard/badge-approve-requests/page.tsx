import React from 'react'
import BadgeApprove from './_components/BadgeApprove'
import { PageHeader } from '../../_components/PageHeader'

const page = () => {
    return (
        <div>
            <PageHeader
                title="Badge Approvals"
                subtitle="Review and approve user achievement badges."
            />

            <div className="p-6 mt-6">

                <BadgeApprove />
            </div>
        </div>
    )
}

export default page