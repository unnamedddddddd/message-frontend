import { SERVER_URL } from "../../config";

const getFindServer = async (text: string) => {
  const request = await fetch(`${SERVER_URL}/api/servers/find?search=${text}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default getFindServer;
