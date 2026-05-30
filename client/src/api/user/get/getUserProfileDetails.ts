import { SERVER_URL } from "@/config";

const getUserProfileDetails = async () => {
  const request = await fetch(`${SERVER_URL}/api/user/profile`, {
    method: 'GET',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default getUserProfileDetails;
