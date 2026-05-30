import { SERVER_URL } from "@/config";

const createChat = async (serverId: number, chatName: string, chatType: string) => {  
  console.log(serverId);
  
  const response = await fetch(`${SERVER_URL}/api/servers/${serverId}/chats/${chatName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },    
    body: JSON.stringify({chatType}),
    credentials: 'include'
  });

  const serverResponse = await response.json();
  return serverResponse;
}

export default createChat;