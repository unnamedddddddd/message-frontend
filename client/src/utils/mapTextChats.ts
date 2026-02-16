import type { TextChatProps, ChatResponse } from "@/types";

const mapTextChats = (dbChats: ChatResponse[]): TextChatProps[] => {
  return dbChats
    .filter(chat => chat.chat_type === 'text')  
    .map(chat => ({
      chatId: chat.chat_id,
      name: chat.chat_name,
    }));
} 

export default mapTextChats;