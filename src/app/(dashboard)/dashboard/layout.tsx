
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
    return (
        <>

            <div className="flex">
                <DashboardSidebar />
                <div className="w-full mt-[80px] p-6 bg-[#EDEEF1]">
                    {children}
                </div>
            </div>
        </>
    );
}

export default layout;