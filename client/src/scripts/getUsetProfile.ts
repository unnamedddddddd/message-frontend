import { SERVER_URL } from "../config";

const getUserProfile = async (userId:number) => {
  const request = await fetch(`${SERVER_URL}/api/me`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userId})
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default getUserProfile;
