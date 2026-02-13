import { getChats, getServers } from "@/api/chat";
import type { ServerProps, TextChatProps, VoiceChatProps } from "@/types";
import { mapTextChats, mapServers, mapVoiceChats } from "@/utils";
import { useCallback, useEffect, useState } from "react";

const useServers = () => {
  const [servers, setServers] = useState<ServerProps[]>([]);
  const [textChats, setTextChats] = useState<TextChatProps[]>([]);
  const [voiceChats, setVoiceChats] = useState<VoiceChatProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const chatsResponse = await getChats(serverId);
    console.log(chatsResponse);
    
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
    voiceChats,
    servers, 
    isLoading,
    textChats,
    setTextChats,
    joinServer,
 };
}

export default useServers;