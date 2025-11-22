import { DashboardOverviewResponse } from "@/types/dashboardStach"

export async function getOverview(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/overview`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  const resData: DashboardOverviewResponse = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get overview data")
  }
  return resData
}