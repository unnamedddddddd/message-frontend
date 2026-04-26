import { SERVER_URL } from "../../config";

const updateStatusInviteServer = async (status: 'accepted' | 'declined', inviteId: number, serverId: number, senderId: number) => {
  const request = await fetch(`${SERVER_URL}/api/invites/${inviteId}/status`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({status, serverId, senderId}),
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default updateStatusInviteServer;
