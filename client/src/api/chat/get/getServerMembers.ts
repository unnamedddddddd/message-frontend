import { SERVER_URL } from "@/config";

const getServerMembers = async (serverId: number) => {
  const request = await fetch(`${SERVER_URL}/api/servers/${serverId}/members`, {
      method: 'GET',
      headers:{'Content-Type': 'application/json'},
      credentials: 'include',
    });
  
    const serverResponse = await request.json();
    return serverResponse;
}

export default getServerMembers;