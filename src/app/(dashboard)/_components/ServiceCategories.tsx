"use client"
import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartConfig,
} from "@/components/ui/chart"

const chartData = [
    { name: "Design", value: 25 },
    { name: "Development", value: 40 },
    { name: "Marketing", value: 30 },
    { name: "Strategy", value: 26 },
    { name: "Operations", value: 18 },
]

const chartConfig = {
    value: {
        label: "Projects",
        color: "#147575",
    },
} satisfies ChartConfig

const ServiceCategories = () => {
    return (
        <Card>
            <CardHeader className="p-6">
                <CardTitle className="text-[#147575] font-semibold text-[16px]">Service Categories</CardTitle>
                <CardDescription className="text-[#68706A] font-normal text-[12px]">Distribution by project type</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                        />
                        <YAxis axisLine={false} tickLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="value"
                            fill="var(--color-value)"
                            radius={[6, 6, 0, 0]}
                            barSize={80}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default ServiceCategories
