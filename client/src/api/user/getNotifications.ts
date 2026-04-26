import { SERVER_URL } from "../../config";

const getNotifications = async () => {
  const request = await fetch(`${SERVER_URL}/api/notifications`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default getNotifications;