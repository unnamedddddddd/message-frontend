import { SERVER_URL } from "@/config";

const getUserProfile = async () => {
  const request = await fetch(`${SERVER_URL}/api/me`, {
    method: 'GET',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default getUserProfile;
