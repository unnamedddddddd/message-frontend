import type { MessageProps } from "@/types";
import { createContext } from "react";

type SocketContextType = {
  messages: Record<string, MessageProps[]>;
  isConnected: boolean;
  isConnectedChat: boolean;
  typingUsers: string[];
  joinSocketTextChat(roomId: string): void;
  sendMessage(message: MessageProps): void;
  sendTypingSocket(): void;
  stopTypingSocket(): void;
  leaveChat(): void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export default SocketContext;