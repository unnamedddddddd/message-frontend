import { getMessages } from "@/api/chat";
import type { MessageProps } from "@/types";

import mapMessages from "@/utils/mapMessages";
import { useState, type FormEvent } from "react";
import useWebSocket from "./useWebSocket";
import useServers from "./useServer";
import { formatTime } from "@/utils";
import { useAuth } from "../user";

const useChat = (userLogin: string) => {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const { isVerified } = useAuth();
  const { 
    isConnected, 
    connect, 
    disconnect,
    socketRef 
  } = useWebSocket(
    userLogin, 
    (newMsg: MessageProps) => setMessages(prev => [...prev, newMsg])
  );
  const { servers } = useServers();   
  const { userAvatar } = useAuth();


  const joinChat = async (roomId: string, chatId: number) => {
    disconnect();
    setMessages([]);

    await loadMessages(chatId);     
    await connect(roomId);
   
    setActiveChatId(chatId)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) {
      alert('Пожалуйста потвердите почту, сделать это можно в вашем профиле')
      return;
    }
    if (!message.trim()) return;
    socketRef.current?.sendMessage(message);
    setMessages(prev => [...prev, { 
      message, 
      userAvatar,
      type: 'my', 
      userName: userLogin, 
      renderTime: formatTime(),
    }]);
    setMessage('');
  };

  const loadMessages = async (chatId: number) => {
    const messageResponse = await getMessages(chatId)
    
    if (!messageResponse.success) {
      setMessages([]); 
      return;
    }
    const currentUserId = Number(localStorage.getItem('user_id'));
    setMessages(mapMessages(messageResponse.messages, currentUserId));
    console.log(messages);  
  }

  return {
    message,
    messages, 
    servers, 
    isConnected, 
    activeChatId,
    socketRef,
    setMessage,
    setMessages,
    joinChat, 
    disconnect,
    handleSubmit, 
  }
}

export default useChat;
