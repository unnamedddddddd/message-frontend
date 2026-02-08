import { SERVER_URL } from "../../../config";

const confirmCode = async (userId: number, userCode: string) => {
  const request = await fetch(`${SERVER_URL}/api/users/${userId}/confirmCode`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userCode})

  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default confirmCode;
