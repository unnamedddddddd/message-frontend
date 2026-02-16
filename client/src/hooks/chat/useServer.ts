import { getChats, getServers } from "@/api/chat";
import type { ServerProps, TextChatProps, VoiceChatProps } from "@/types";
import { mapTextChats, mapServers, mapVoiceChats } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const useServer = () => {
  const [servers, setServers] = useState<ServerProps[]>([]);
  const [textChats, setTextChats] = useState<TextChatProps[]>([]);
  const [voiceChats, setVoiceChats] = useState<VoiceChatProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentServerId, setCurrentServerId] = useState<number | null>(null);

  const loadServers = useCallback(async () => {
     setIsLoading(true); 
    try {
      const res = await getServers();
      if (res.success) setServers(mapServers(res.servers));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const joinServer = async (serverId: number) => {    
    setTextChats([]);
    setVoiceChats([]);
    setCurrentServerId(serverId);

    const chatsResponse = await getChats(serverId);

    if (!chatsResponse.success) {
      console.log('Чаты не найдены:', chatsResponse.message);
      return;
    }
    setTextChats(mapTextChats(chatsResponse.chats))
    setVoiceChats(mapVoiceChats(chatsResponse.chats))  
  }


  useEffect(() => {
    loadServers();
  }, [loadServers])

  return { 
    currentServerId,
    voiceChats,
    servers, 
    isLoading,
    textChats,
    setTextChats,
    setCurrentServerId,
    joinServer,
 };
}

export default useServer;