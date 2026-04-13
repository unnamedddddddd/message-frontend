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
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isConnectedChat, setIsConnectedChat] = useState<boolean>(false);
  const { userLogin } = useAuth();

  const handleTyping = ({ userName }: { userName: string }) => {    
    setTypingUsers(prev => [...new Set([...prev, userName])]);
  };

  const handleStopTyping = ({ userName }: { userName: string }) => {    
    setTypingUsers(prev => prev.filter(name => name !== userName));
  };

  const getMessagesSocketHandler = (newMsg: MessageProps) => { 
     const roomId = socketRef.current?.socket?.roomId;
      if (!roomId) return;

    const message: MessageProps = {
      type: newMsg.type,
      message: newMsg.message,
      userName: newMsg.userName,
      userAvatar: newMsg.userAvatar,
      renderTime: formatTime(newMsg.renderTime)
    }
    
    setMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), message]
    }));
    //addNotification('info', `Пришло сообщенение от ${newMsg.userName}`)
  }
  
  const connect = () => {
    if (socketRef.current) {
      return;
    }
    socketRef.current = new WebSocketChat()
    socketRef.current.connect().then(() => {
      if (!socketRef.current) return;

      socketRef.current.onUserTyping(handleTyping);
      socketRef.current.onUserStopTyping(handleStopTyping);
      setIsConnected(true);
    })
    
    .catch((err) => {
      console.error('Ошибка подклчения сокета', err);
    });
   
  }
  
  const sendMessage = (message: MessageProps) => {
    const roomId = socketRef.current?.socket?.roomId;
    
    if (!roomId) return;

    if (!message) return;
    console.log(message);
    
    socketRef.current?.sendMessage(message.message);
    setMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), message]
    }))
    stopTypingSocket();
  }

  const joinSocketTextChat = async (roomId: string) => {
    try {
      if (!userLogin) return;

      socketRef.current?.offMessage();
      socketRef.current?.joinTextChat(roomId, userLogin);
      
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
 
  const sendTypingSocket = () => {
    socketRef.current?.sendTyping();
  }

  const stopTypingSocket = () => {
    socketRef.current?.stopTyping();
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

  // setInterval(() => {
  //   getTypingUsersSocket();
  // }, 1000)

  useEffect(() => {
    connect();

    return () => {
      socketRef.current?.removeAllListeners();
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);


  return ( 
    <SocketContext.Provider value={{
      messages,
      isConnected,
      isConnectedChat,
      typingUsers,
      sendTypingSocket,
      stopTypingSocket,
      joinSocketTextChat,
      sendMessage,
      leaveChat
    }}>
      {children}
    </SocketContext.Provider>
  );


}