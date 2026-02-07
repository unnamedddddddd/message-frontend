import { getChats, getMessages, getServers } from "@/api/chat";
import type { ChatProps, ChatResponse, MessageProps, ServerProps } from "@/interfaces";
import { WebSocketChat } from "@/modules";
import { formatTime, mapServers } from "@/utils";
import mapMessages from "@/utils/mapMessages";
import { useEffect, useRef, useState } from "react";

const useChat = (userLogin: string) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const socketRef = useRef<WebSocketChat | null>(null);
  const [servers, setServers] = useState<ServerProps[]>([]);
  const [chats, setChats] = useState<ChatProps[]>([]);

  useEffect(() => {
    const loadServers  = async () => {
      const serversResponse = await getServers();

      if (!serversResponse.success) {
        console.log('Сервера не найдены:', serversResponse.message);
        return;
      }
     
      setServers(mapServers(serversResponse.servers));
    }

    loadServers();
  }, [])

  const joinServer = async (serverId: number) => {
    const chatsResponse = await getChats(serverId);

    if (!chatsResponse.success) {
      console.log('Чаты не найдены:', chatsResponse.message);
      return;
    }
    const chatsAsChatProps: ChatProps[] = chatsResponse.chats.map((chat: ChatResponse) => {
      return {
        chatId: chat.chat_id,
        name: chat.chat_name,  
      };
    })

    setChats(chatsAsChatProps)  
  }

  const connect = (roomId: string, chatId: number) => {
    if (socketRef.current) {
      disconnect();
    }

    socketRef.current = new WebSocketChat()

    loadMessages(chatId);
    const handleMessage = (data: MessageProps) => {    
      setMessages(prev => [...prev, {
        type: data.type, 
        message: data.message,
        userName: data.userName,
        renderTime: formatTime(data.renderTime),
      }])     
    }

    socketRef.current.connect(roomId, userLogin).then(() => {
      socketRef.current?.getMessage(handleMessage);
      setIsConnected(true);
      setActiveChatId(chatId)
    })
  }

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setMessages([])
      setActiveChatId(null);
    }
  }

 const loadMessages = async (chatId: number) => {
    const messageResponse = await getMessages(chatId)
    
    if (!messageResponse.success) {
      setMessages([]); 
      return;
    }

    const currentUserId = Number(localStorage.getItem('user_id'));
    setMessages(mapMessages(messageResponse.messages, currentUserId));
  }

 return {
    messages,
    servers,
    chats,
    isConnected,
    activeChatId,
    connect,
    disconnect,
    loadMessages, 
    setMessages,
    joinServer,  
    socketRef,
  }
}

export default useChat;
