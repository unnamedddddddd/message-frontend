import { useState, type FormEvent } from "react";
import { formatTime } from "@/utils";
import useServer from "../useServer";
import { useAuth } from "@/hooks/user";
import useWebSocket from "../useWebSocket";
import { getOrCreatePersonalChat } from "@/api/chat/get";


const useChat = (userLogin: string) => {
  const [message, setMessage] = useState<string>('')
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  // const { isVerified } = useAuth();  
  const { 
    isConnected,
    isConnectedChat,
    sendMessage,
    leaveChat,
    joinSocketTextChat 
  } = useWebSocket();
  const { servers } = useServer();   
  const { userAvatar } = useAuth();

  const joinChat = async (chatType: 'server' | 'personal', chatId: number, friendId?: number) => {
    console.log(chatType);
    
    if (isConnectedChat) {
      leaveChat();
    }
  
    if (chatId && isConnected && chatType === 'server') {
      joinSocketTextChat(chatId.toString(), chatType)
      setActiveChatId(chatId)
    }  

    if (friendId && isConnected && chatType === 'personal') {      
    const currentUserId = Number(localStorage.getItem('user_id'));
    const maxId = Math.max(currentUserId, friendId);
    const minId = Math.min(currentUserId, friendId);

    const data = await getOrCreatePersonalChat(maxId, minId);
    if (data.success) {
      joinSocketTextChat(data.chatId, chatType);   
      setActiveChatId(data.chatId); 
    }
   }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    sendMessage({ 
      message, 
      userAvatar,
      type: 'my', 
      userName: userLogin, 
      renderTime: formatTime(),
    })
    setMessage('');
  };

  return {
    message,
    servers, 
    isConnected, 
    activeChatId,
    setMessage,
    joinChat, 
    handleSubmit, 
  }
}

export default useChat;