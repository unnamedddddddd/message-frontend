import type { MessageProps, OnlineFriendsResponseProps } from "@/types";
import { createContext } from "react";

type SocketContextType = {
  messages: Record<string, MessageProps[]>;
  isConnected: boolean;
  isConnectedChat: boolean;
  typingUsers: string[];
  friendsOnline: OnlineFriendsResponseProps [];
  joinSocketTextChat(roomId: string, chatType: 'server' | 'personal'): void;
  sendMessage(message: MessageProps): void;
  sendTypingSocket(): void;
  getFriendsSocket(): void;
  stopTypingSocket(): void;
  leaveChat(): void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export default SocketContext;