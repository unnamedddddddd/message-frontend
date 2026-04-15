import { useState, type FormEvent } from "react";
import useServer from "./useServer";
import { formatTime } from "@/utils";
import { useAuth } from "../user";
import { useWebSocket } from "./useWebSocket";
import { getOrCreatePersonalChat } from "@/api/chat";

const useChat = (userLogin: string) => {
  const [message, setMessage] = useState<string>('')
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const { isVerified } = useAuth();  
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
    if (isConnectedChat) {
      leaveChat();
    }
  
    if (chatId && isConnected && chatType === 'server') {
      joinSocketTextChat(chatId.toString(), chatType)
      setActiveChatId(chatId)
    }  

    if (friendId && isConnected && chatType === 'personal') {
    console.log('personal');
      
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
    // if (!isVerified) {
    //   alert('Пожалуйста потвердите почту, сделать это можно в вашем профиле')
    //   return;
    // }    
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