import { SERVER_URL } from "@/config";

const getOrCreatePersonalChat = async (firstUserId: number, secondUserId: number) => {  
  const response = await fetch(`${SERVER_URL}/api/personal-chat/get-or-create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },    
    body: JSON.stringify({firstUserId, secondUserId}),
    credentials: 'include'
  });

  const serverResponse = await response.json();
  return serverResponse;
}

export default getOrCreatePersonalChat;