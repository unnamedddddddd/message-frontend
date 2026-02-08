import { SERVER_URL } from "@/config"

const uploadUserAvatar = async (file: File, userId: number) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${SERVER_URL}/api/users/${userId}/avatar`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });


  return await response.json()
}

export default uploadUserAvatar;