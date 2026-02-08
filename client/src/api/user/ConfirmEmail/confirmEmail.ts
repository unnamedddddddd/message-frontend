import { SERVER_URL } from "../../../config";

const confirmEmail = async (userId: number, userEmail: string) => {
  const request = await fetch(`${SERVER_URL}/api/users/${userId}/confirmEmail`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userEmail})
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default confirmEmail;
