
export async function addBlog(token: string, payload : { title: string, description: string, image: File}) {
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
