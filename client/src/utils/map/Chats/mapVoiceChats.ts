import type { ChatResponse, VoiceChatProps } from "@/types";

const mapVoiceChats = (dbChats: ChatResponse[]): VoiceChatProps[] => {
  return dbChats
    .filter(chat => chat.chat_type === 'voice')  
    .map(chat => ({
      chatId: chat.chat_id,
      name: chat.chat_name,
    }));
} 

export default mapVoiceChats;