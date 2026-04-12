import { useState, type FormEvent } from "react";
import useServer from "./useServer";
import { formatTime } from "@/utils";
import { useAuth } from "../user";
import { useWebSocket } from "./useWebSocket";

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

  const joinChat = async (chatId: number, friendId?: number ) => {
    if (isConnectedChat) {
      leaveChat();
    }
  
    if (chatId && isConnected) {
      joinSocketTextChat(chatId.toString())
    }  
  //  if (friendId) {
  //   const currentUserId = Number(localStorage.getItem('user_id'));
  //   // const correctRoomId = [currentUserId, friendId].sort((a, b) => a - b).join('_');

  //   disconnect();
  //   setMessages([]);

  //   await loadMessages(friendId); 
  //   await connect();   
  //  }


    setActiveChatId(chatId)
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