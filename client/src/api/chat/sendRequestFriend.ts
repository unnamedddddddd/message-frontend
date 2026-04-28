import { SERVER_URL } from "@/config"

const sendRequestFriend = async (receiverId: number) => {
  const response = await fetch(`${SERVER_URL}/api/users/${receiverId}/invites`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await response.json();
  return serverResponse;
}

export default sendRequestFriend;