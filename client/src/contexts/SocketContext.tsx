import type { MessageProps } from "@/types";
import { createContext } from "react";

type SocketContextType = {
  messages: Record<string, MessageProps[]>;
  isConnected: boolean;
  currentChatId: number | null;
  isConnectedChat: boolean;
  joinSocketTextChat(roomId: string): void;
  sendMessage(message: MessageProps): void;
  leaveChat(): void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export default SocketContext;