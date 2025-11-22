
export async function updateProfileInfo(
  token: string,
  payload: FormData
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-my-profile`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,

      },
      body: payload,
    }
  )

  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message ?? 'Failed to update profile')
  }
  return resData
}

export async function updateAvatar(token: string, payload: { avatar: File }) {
  const formData = new FormData();

  formData.append("profileImage", payload.avatar);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-my-profile`, {
    method: "PUT",
    headers: {

      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to update profile");
  return resData;
}


export async function getProfile(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  const resData = await response.json()
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get profile")
  }
  return resData
}

export async function changePassword(token: string, payload: { oldPassword: string; newPassword: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to update password");
  return resData;
}

export async function updateStatus(token: string, payload: { status: string, id: string }) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      {
        status: payload.status,
      }
    ),
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to update profile");
  return resData;
}