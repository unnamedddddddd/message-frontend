import { SERVER_URL } from "../../config";

const getServers = async () => {
  const request = await fetch(`${SERVER_URL}/api/servers`, {
    method: 'GET',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default getServers;
