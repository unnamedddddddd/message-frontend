import { getMessages } from "@/api/chat";
import SocketContext from "@/contexts/SocketContext";
import { useAuth } from "@/hooks/user";
import { WebSocketChat } from "@/modules";
import type { MessageProps } from "@/types";
import { formatTime, mapMessages } from "@/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const SocketProvider = ({children}: {children: ReactNode}) => {
  const socketRef = useRef<WebSocketChat | null>(null);
  const [messages, setMessages] = useState<Record<string, MessageProps[]>>({});
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnectedChat, setIsConnectedChat] = useState<boolean>(false);
  const { userLogin } = useAuth();
  const [currentChatId, setCurrentChatId] = useState<number | null>(null); 

  const getMessagesSocketHandler =(newMsg: MessageProps) => { 
    if (!currentChatId) return;

    const message: MessageProps = {
      type: newMsg.type,
      message: newMsg.message,
      userName: newMsg.userName,
      userAvatar: newMsg.userAvatar,
      renderTime: formatTime(newMsg.renderTime)
    }
    setMessages(prev => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), message]
    }));
    //addNotification('info', `Пришло сообщенение от ${newMsg.userName}`)
  }
  
  const connect = () => {
      if (socketRef.current) {
        return;
      }
      socketRef.current = new WebSocketChat()
      socketRef.current.connect().then(() => {
        setIsConnected(true);
      })
      .catch((err) => {
        console.error('Socket connect error', err);
      });
    }
  
  const sendMessage = (message: MessageProps) => {
    if (!currentChatId) return;
    if (!message) return;
    console.log(message);
    
    socketRef.current?.sendMessage(message.message);
    setMessages(prev => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), message]
    }))
  }

  const joinSocketTextChat = async (roomId: string) => {
  try {
    if (!userLogin) return;

    socketRef.current?.offMessage();
    socketRef.current?.joinTextChat(roomId, userLogin);

    setCurrentChatId(Number(roomId));
    setIsConnectedChat(true);

    socketRef.current?.getMessage(getMessagesSocketHandler);

    await loadMessagesSocket(Number(roomId));
  } catch (error) {
    console.error(error);
  }
};

  const leaveChat = () => {
    if (socketRef.current) {
      socketRef.current.leaveRoom();
      setMessages({});
      setIsConnectedChat(false);
    }
  }
  
  const loadMessagesSocket = async (chatId: number) => {
  const messageResponse = await getMessages(chatId);
  if (!messageResponse.success) return;
    
  const currentUserId = Number(localStorage.getItem("user_id"));

  const mapped = mapMessages(messageResponse.messages, currentUserId)  
  setMessages(prev => ({
    ...prev,
    [chatId]: mapped
  }));
};

  useEffect(() => {
    connect();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);


  return ( 
    <SocketContext.Provider value={{
      messages,
      isConnected,
      isConnectedChat,
      currentChatId,
      joinSocketTextChat,
      sendMessage,
      leaveChat
    }}>
      {children}
    </SocketContext.Provider>
  );


}