
export async function getAllBadge(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badge`, {
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

export async function getAllLevel(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lavel`, {
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


export async function addLevel(
    token: string,
    payload: { level: string; badges: File[] }
) {
    const formData = new FormData();

    formData.append("name", payload.level); // fixed spelling

    // append multiple images
    payload.badges.forEach((file) => {
        formData.append("badge", file); // backend must accept "badges[]"
    });

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/badge`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    );

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed to create level");
    return resData;
}


export async function getAllBadgeRequest(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badge/request`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    const resData = await response.json()
    if (!response.ok) {
        throw new Error(resData.message || "Failed to get level data")
    }
    return resData
}

export async function approveLevel(token: string, payload: { userId: string}) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badge/request/${payload.userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed to ");
    return resData;
}


export async function approveLevelOnly(token: string, payload: { userId: string}) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lavel/${payload.userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed to ");
    return resData;
}

export async function rejectLevelOnly(token: string, payload: { userId: string}) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lavel/${payload.userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed to ");
    return resData;
}

export async function deleteBadge(token: string, id: string,) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badge/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to ");
  return resData;
}
