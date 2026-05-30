import type { MembersProps, ServerProps, TextChatProps, VoiceChatProps } from "@/types";
import { useCallback, useEffect, useState } from "react";
import useWebSocket from "./useWebSocket";
import { getChats, getServers } from "@/api/chat/get";
import getServerMembers from "@/api/chat/get/getServerMembers";
import mapMembers from "@/utils/map/mapMembers";
import { mapServers, mapTextChats, mapVoiceChats } from "@/utils/map";

const useServer = () => {
  const [servers, setServers] = useState<ServerProps[]>([]);
  const [textChats, setTextChats] = useState<TextChatProps[]>([]);
  const [voiceChats, setVoiceChats] = useState<VoiceChatProps[]>([]);
  const [serverMembers, setServerMembers] = useState<MembersProps[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const { currentServerId, setCurrentServerId } = useWebSocket();
  const loadServers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getServers();
      if (res.success) setServers(mapServers(res.servers));
    } finally {
      setIsLoading(false);
    }
  }, []);


  const loadChats = useCallback(async () => {
    setTextChats([]);
    setVoiceChats([]);

    const chatsResponse = await getChats(currentServerId!);
    if (chatsResponse.success) {
      setTextChats(mapTextChats(chatsResponse.chats));
      setVoiceChats(mapVoiceChats(chatsResponse.chats));
    }
  }, [currentServerId])

  const joinServer = useCallback(async () => {
    setServerMembers([]);

    loadChats();
    const membersResponse = await getServerMembers(currentServerId!);
    if (membersResponse.success) {
      setServerMembers(mapMembers(membersResponse.members));
    }
  }, [currentServerId, loadChats])

  useEffect(() => {
    loadServers();
  }, [loadServers]);

  useEffect(() => {
    if (!currentServerId) return;
    joinServer();
    joinServer()
  }, [currentServerId, joinServer]);

  return {
    voiceChats,
    servers,
    isLoading,
    serverMembers,
    textChats,
    setTextChats,
    loadChats,
    setCurrentServerId,
    joinServer,
  };
}

export default useServer; 
