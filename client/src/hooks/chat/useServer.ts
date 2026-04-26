import { getChats, getServers } from "@/api/chat";
import getServerMembers from "@/api/chat/getServerMembers";
import type { MembersProps, ServerProps, TextChatProps, VoiceChatProps } from "@/types";
import { mapTextChats, mapServers, mapVoiceChats } from "@/utils";
import mapMembers from "@/utils/mapMembers";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const useServer = () => {
  const [servers, setServers] = useState<ServerProps[]>([]);
  const [textChats, setTextChats] = useState<TextChatProps[]>([]);
  const [voiceChats, setVoiceChats] = useState<VoiceChatProps[]>([]);
  const [serverMembers, setServerMembers] = useState<MembersProps[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentServerId, setCurrentServerId] = useState<number | null>(null);
  const navigate = useNavigate();
  const locationUser = useLocation();

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
    if (locationUser.pathname === '/personalMessages') {
      navigate('/home');
    }   
    setServerMembers([]);
    setTextChats([]);
    setVoiceChats([]);
    setCurrentServerId(serverId);

    const chatsResponse = await getChats(serverId);
    if (!chatsResponse.success) {
      console.log('Чаты не найдены:', chatsResponse.message);
    }
    if (chatsResponse.success) {
      setTextChats(mapTextChats(chatsResponse.chats));
      setVoiceChats(mapVoiceChats(chatsResponse.chats));
    }
    
    const membersResponse = await getServerMembers(serverId);    
    if (!membersResponse.success) {
      console.log('Участники не найдены:', membersResponse.message);
      return;
    }    
    setServerMembers(mapMembers(membersResponse.members));
  }

  useEffect(() => {
    loadServers();
  }, [loadServers])

  return { 
    currentServerId,
    voiceChats,
    servers, 
    isLoading,
    serverMembers,
    textChats,
    setTextChats,
    setCurrentServerId,
    joinServer,
 };
}

export default useServer;