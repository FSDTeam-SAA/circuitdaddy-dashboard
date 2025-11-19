import { FaqResponse, SingleFaqResponse } from "@/types/faq";


export async function addFaq(token: string, payload: { title: string, description: string }) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/faq`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: payload.title,
      description: payload.description,
    }),
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to ");
  return resData;
}


export async function editFaq(token: string, payload: { title: string, description: string },id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/faq/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: payload.title,
      description: payload.description,
    }),
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to ");
  return resData;
}

export async function getAllFaq({ page, limit }: { page?: number; limit?: number }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/faq?page=${page}&limit=${limit}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData: FaqResponse = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get blog data")
  }
  return resData
}

export async function getSingelFaq(id:string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/faq/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData: SingleFaqResponse = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get blog data")
  }
  return resData
}

export async function deleteFaq(token: string, id: string,) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/faq/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to ");
  return resData;
}
