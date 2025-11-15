import { IndustryResponse, SingleIndustry } from "@/types/industries";

export async function getAllIndustries({ page, limit }: { page?: number; limit?: number }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/industry?page=${page}&limit=${limit}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    const resData: IndustryResponse = await response.json()
    if (!response.ok) {
        throw new Error(resData.message || "Failed to get industry data")
    }
    return resData
}

export async function deleteIndustry(token: string, id: string,) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/industry/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed to ");
    return resData;
}

export async function addIndustry(token: string, payload: { name: string, discription: string, status: string }) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/industry`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: payload.name,
            discription: payload.discription,
            status: payload.status,
        }),
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed to ");
    return resData;
}

export async function getSingleIndustry(id:string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/industry/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData: SingleIndustry = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get blog data")
  }
  return resData
}

export async function editIndustry(token: string,id : string , payload: { name: string, discription: string, status: string, }) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/industry/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: payload.name,
            discription: payload.discription,
            status: payload.status,
        }),
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed to ");
    return resData;
}
