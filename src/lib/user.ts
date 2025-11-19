import { GetAllUsersResponse } from "@/types/user";

export async function getAllUser({ page, limit }: { page?: number; limit?: number }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/all-user?page=${page}&limit=${limit}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData: GetAllUsersResponse = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get blog data")
  }
  return resData
}