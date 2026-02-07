import type { MessageProps, MessageResponse } from "@/interfaces";
import formatTime from "./time";

const mapMessages = (dbMessages: MessageResponse[], currentUserId: number): MessageProps[] => {
  return dbMessages.map(msg => ({
    userName: msg.user_login,
    message: msg.message_text,
    renderTime: formatTime(msg.created_at),
    type: Number(currentUserId) === Number(msg.user_id) ? 'my' : 'chat',
  }));
} 

export default mapMessages;