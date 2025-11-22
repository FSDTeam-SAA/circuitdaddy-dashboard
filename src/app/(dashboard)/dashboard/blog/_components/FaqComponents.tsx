import React from 'react'
// import FAQCategoriesGrid from './faq-categories-grid'
import FAQUpdatesTable from './faq-updates-table'

const FaqComponents = () => {
    return (
        <main className="min-h-screen bg-white rounded-md">
            <div className="container mx-auto px-8 py-12">
                {/* <FAQCategoriesGrid /> */}
                <FAQUpdatesTable />
            </div>
        </main>
    )
}

export default FaqComponents