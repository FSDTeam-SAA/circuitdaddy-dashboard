

// "use client"

// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import {
//     ChartConfig,
//     ChartContainer,
//     ChartTooltip,
//     ChartTooltipContent,
// } from "@/components/ui/chart"
// import { useGetAllGrowthStats } from "@/hooks/apiCalling"
// import { useSession } from "next-auth/react"

// export const description = "A single line chart with visible axes"

// const chartConfig = {
//     desktop: {
//         label: "Desktop",
//         color: "#147575",
//     },
// } satisfies ChartConfig

// const PlatformGrowth = () => {
//     const { data: session } = useSession()
//     const token = (session?.user as { accessToken: string })?.accessToken
//     const growth = useGetAllGrowthStats(token)

//     // Map API response to chart data format
//     const chartData = Array.isArray(growth?.data)
//         ? growth.data.map((item: { month: string; totalEarnings: number }) => ({
//               month: item.month,
//               desktop: item.totalEarnings,
//           }))
//         : []

//     return (
//         <Card>
//             <CardHeader className="p-6">
//                 <CardTitle className="text-[#147575] font-semibold text-[16px]">
//                     Platform Growth
//                 </CardTitle>
//                 <CardDescription className="text-[#68706A] font-normal text-[12px]">
//                     User registrations over time
//                 </CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <ChartContainer config={chartConfig}>
//                     <LineChart
//                         data={chartData}
//                         margin={{ top: 10, right: 20, left: 40, bottom: 20 }} // extra space for Y-axis
//                     >
//                         {/* Grid */}
//                         <CartesianGrid strokeDasharray="3 3" />

//                         {/* X-axis: months at bottom */}
//                         <XAxis
//                             dataKey="month"
//                             axisLine={{ stroke: "#ccc" }}
//                             tickLine={{ stroke: "#ccc" }}
//                             tick={{ fontSize: 12, fill: "#68706A" }}
//                             interval={0} // show all months
//                         />

//                         {/* Y-axis: earnings on left sidebar */}
//                         <YAxis
//                             axisLine={{ stroke: "#ccc" }}
//                             tickLine={{ stroke: "#ccc" }}
//                             tick={{ fontSize: 12, fill: "#68706A" }}
//                         />

//                         {/* Tooltip */}
//                         <ChartTooltip content={<ChartTooltipContent />} />

//                         {/* Line */}
//                         <Line
//                             type="monotone"
//                             dataKey="desktop"
//                             stroke="#147575"
//                             strokeWidth={3}
//                             dot={{ fill: "#147575", r: 5 }}
//                             activeDot={{ r: 7 }}
//                         />
//                     </LineChart>
//                 </ChartContainer>
//             </CardContent>
//         </Card>
//     )
// }

// export default PlatformGrowth



"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetAllGrowthStats } from "@/hooks/apiCalling"
import { useSession } from "next-auth/react"

const chartConfig = {
    earnings: {
        label: "Earnings",
        color: "#147575",
    },
} satisfies ChartConfig

const PlatformGrowth = () => {
    const { data: session } = useSession()
    const token = (session?.user as { accessToken: string })?.accessToken

    const { data: growth, isLoading } = useGetAllGrowthStats(token)


    const chartData =
        Array.isArray(growth?.data)
            ? growth.data.map(
                (item: { month: string; totalEarnings: number }) => ({
                    month: item.month,
                    earnings: item.totalEarnings,
                })
            )
            : []

    if (isLoading) {
        return <div className="p-6 text-sm text-gray-500">Loading chart...</div>
    }

    return (
        <Card>
            <CardHeader className="p-6">
                <CardTitle className="text-[#147575] font-semibold text-[16px]">
                    Platform Growth
                </CardTitle>
                <CardDescription className="text-[#68706A] font-normal text-[12px]">
                    Monthly earnings overview
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: "#68706A" }}
                            interval={0}
                        />

                        <YAxis
                            tick={{ fontSize: 12, fill: "#68706A" }}
                        />

                        <ChartTooltip content={<ChartTooltipContent />} />

                        <Line
                            type="monotone"
                            dataKey="earnings"
                            stroke="#147575"
                            strokeWidth={3}
                            dot={{ fill: "#147575", r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default PlatformGrowth
