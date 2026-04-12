import { SERVER_URL } from "../../config";

const getFriends = async () => {
  const request = await fetch(`${SERVER_URL}/api/me/friends`, {
    method: 'GET',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default getFriends;
