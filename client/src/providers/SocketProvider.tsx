import { getMessages } from "@/api/chat";
import SocketContext from "@/contexts/SocketContext";
import { useAuth } from "@/hooks/user";
import { WebSocketChat } from "@/modules";
import type { MessageProps, OnlineFriendsResponseProps } from "@/types";
import { formatTime, mapMessages } from "@/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const SocketProvider = ({children}: {children: ReactNode}) => {
  const socketRef = useRef<WebSocketChat | null>(null);
  const [messages, setMessages] = useState<Record<string, MessageProps[]>>({});
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isConnectedChat, setIsConnectedChat] = useState<boolean>(false);
  const [chatType, setChatType] = useState<'server' | 'personal'>('server');
  const { userLogin } = useAuth();
  const [friendsOnline, setFriendsOnline] = useState<OnlineFriendsResponseProps[]>([]);


  const handleTyping = ({ userName }: { userName: string }) => {
    setTypingUsers(prev => [...new Set([...prev, userName])]);
  };

  const handleStopTyping = ({ userName }: { userName: string }) => {    
    setTypingUsers(prev => prev.filter(name => name !== userName));
  };

  const handleOnlineFriends = (data: OnlineFriendsResponseProps[]) => {    
    setFriendsOnline(data);
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
      socketRef.current.onOnlineFriends(handleOnlineFriends);
      setIsConnected(true);
    })
    .catch((err) => {
      console.error('Ошибка подклчения сокета', err);
    });
    socketRef.current.requestOnlineFriends();
  }
  
  const getFriendsSocket = () => {
    socketRef.current?.requestOnlineFriends();
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

  const joinSocketTextChat = async (roomId: string, chatType: 'server' | 'personal') => {
    try {
      if (!userLogin) return;

      socketRef.current?.offMessage();
      socketRef.current?.joinTextChat(roomId, userLogin, chatType);
      
      setIsConnectedChat(true);
      setChatType(chatType);
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
    const messageResponse = await getMessages(chatId, chatType); 
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

    const pingInterval = setInterval(() => {
      socketRef.current?.sendPing();
      socketRef.current?.requestOnlineFriends();
    }, 10000);

    return () => {
      socketRef.current?.removeAllListeners();
      socketRef.current?.disconnect();
      socketRef.current = null;
      clearInterval(pingInterval);
    };
  }, []);

  return ( 
    <SocketContext.Provider value={{
      messages,
      isConnected,
      isConnectedChat,
      typingUsers,
      friendsOnline,
      sendTypingSocket,
      stopTypingSocket,
      joinSocketTextChat,
      getFriendsSocket,
      sendMessage,
      leaveChat
    }}>
      {children}
    </SocketContext.Provider>
  );
}