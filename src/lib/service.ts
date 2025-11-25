import { SingleService } from "@/types/service";

export async function getAllService({ page, limit }: { page?: number; limit?: number }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service?page=${page}&limit=${limit}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get service data")
  }
  return resData
}

export async function deleteService(token: string, id: string,) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to ");
  return resData;
}

export async function addService(token: string, payload: { name: string, discription: string, image: File }) {
  const formData = new FormData();
  console.log(payload.image)
  formData.append("serviceName", payload.name);
  formData.append("description", payload.discription);
  formData.append("image", payload.image);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service`, {
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

export async function getSingleService(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData: SingleService = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get service data")
  }
  return resData
}

export async function editService(token: string, id: string, payload: { name: string, description: string, image: File }) {

  console.log(payload)
  const formData = new FormData();

  formData.append("serviceName", payload.name);
  formData.append("description", payload.description);
  if (payload.image) {
    formData.append("image", payload.image)
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to ");
  return resData;
}

export async function getAllServiceStast() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/service`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get service data")
  }
  return resData
}

export async function getAllGrowth(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/monthly-earnings`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get service data")
  }
  return resData
}


export async function getAllActiveProject(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my?status=in_progress&limit=3`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get project data")
  }
  return resData
}

export async function getAllProjectCompleted(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/my?status=completed&limit=2`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get project data")
  }
  return resData
}