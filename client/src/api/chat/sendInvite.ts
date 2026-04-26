import { SERVER_URL } from "@/config"

const sendInvite = async (serverId: number) => {
  const response = await fetch(`${SERVER_URL}/api/servers/${serverId}/invites`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await response.json();
  return serverResponse;
}

export default sendInvite;