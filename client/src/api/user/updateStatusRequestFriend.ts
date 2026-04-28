import { SERVER_URL } from "../../config";

const updateStatusRequestFriend = async (status: 'accepted' | 'declined', requestId: number, senderId: number) => {
  const request = await fetch(`${SERVER_URL}/api/friendRequests/${requestId}/status`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({status, senderId}),
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default updateStatusRequestFriend;
