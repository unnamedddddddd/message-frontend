import type { MessageProps, OnlineFriendsResponseProps } from "@/types";
import type { SignalData } from "simple-peer";
import { createContext } from "react";

type Participant = {
  socketId: string;
  userId?: number | string;
  userName?: string;
};

type SocketContextType = {
  messages: Record<string, MessageProps[]>;
  isConnected: boolean;
  isConnectedChat: boolean;
  currentServerId: number | null;
  typingUsers: string[];
  friendsOnline: OnlineFriendsResponseProps[];
  joinVoiceSocket: () => void;
  leaveVoiceSocket: () => void;
  getVoiceParticipants: () => Promise<Participant[] | undefined>;
  sendVoiceSignal: (signal: SignalData, targetSocketId: string) => void;
  onVoiceSignal: (handler: (data: { from: string; signal: SignalData }) => void) => void;
  onUserJoinedVoiceSocket: (handler: (data: { userId: string }) => void) => void;
  onUserLeftVoiceSocket: (handler: (data: { userId: string }) => void) => void;
  offVoiceEvents: () => void;
  getSocketId: () => string | undefined;
  joinSocketTextChat(roomId: string, chatType: 'server' | 'personal'): void;
  setCurrentServerId: (id: number | null) => void;
  sendMessage(message: MessageProps): void;
  sendTypingSocket(): void;
  getFriendsSocket(): void;
  stopTypingSocket(): void;
  leaveChat(): void;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export default SocketContext;