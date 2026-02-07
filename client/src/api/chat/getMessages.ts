import { SERVER_URL } from "../../config";

const getMessagesChat = async (chatId: number) => {
  const request = await fetch(`${SERVER_URL}/api/chats/${chatId}/messages`, {
    method: 'GET',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default getMessagesChat;
