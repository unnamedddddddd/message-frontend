import type { ChatProps, ChatResponse } from "@/types";

const mapСhats = (dbChats: ChatResponse[], ): ChatProps[] => {
  return dbChats.map(chat => ({
    chatId: chat.chat_id,
    name: chat.chat_name,  
  }));
} 

export default mapСhats;