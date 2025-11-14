import { BlogResponse, SingelBlogResponse } from "@/types/blog";

export async function addBlog(token: string, payload: { title: string, description: string, image: File }) {
  const formData = new FormData();

  formData.append("featuredImage", payload.image);
  formData.append("title", payload.title);
  formData.append("content", payload.description);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to ");
  return resData;
}

export async function getAllBlog({ page, limit }: { page?: number; limit?: number }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog?page=${page}&limit=${limit}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData: BlogResponse = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get blog data")
  }
  return resData
}

export async function getSingleBlog(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData: SingelBlogResponse = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get blog data")
  }
  return resData
}


export async function editBlog(token: string, payload: { title: string, description: string, image: File },id: string,) {
  const formData = new FormData();
    console.log("id in useEditBlog:", id);
  if (payload.image) formData.append("featuredImage", payload.image);

  formData.append("title", payload.title);
  formData.append("content", payload.description);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to ");
  return resData;
}
