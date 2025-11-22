
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

export async function addLevel(token: string, payload: { level: string, badge: File }) {
    const formData = new FormData();

    formData.append("lavel", payload.level);
    formData.append("badge", payload.badge);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badge`, {
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
