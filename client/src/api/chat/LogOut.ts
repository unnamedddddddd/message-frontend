import { SERVER_URL } from "../../config";

const LogOut = async () => {
  const request = await fetch(`${SERVER_URL}/api/logout`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default LogOut;
