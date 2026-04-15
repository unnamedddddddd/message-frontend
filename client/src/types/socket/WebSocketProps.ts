import type { SignalData } from "simple-peer";
import type MessageProps from "../chat/MessageProps";
import type Participant from "./ParticipantProps";
import type { OnlineFriendsResponseProps } from "../response";

export default interface IWebSocketClient {
  socketId: string | undefined; 
  connect(userName: string): Promise<void>;
  joinTextChat(roomId: string, userName: string,  chatType: 'server' | 'personal'): void;
  getVoiceSignal(handler: (data: { from: string; signal: SignalData }) => void): void;
  sendVoiceSignalGroup(signal: unknown, targetSocketId: string): void;
  sendMessage(message: string): void;
  getMessage(handler: (data: MessageProps) => void): void;
  getParticipants(): Promise<Participant[]>;
  onOnlineFriends(handler: (data: OnlineFriendsResponseProps[]) => void): void;
  onUserLeftVoice(handler: (data: {userId: string}) => void ): void;
  onUserJoinedVoice(handler: (data: {userId: string}) => void ): void;
  offMessage(): void;
  joinVoiceChat(): void;
  onUserStopTyping(handler: (data: { userName: string }) => void): void;
  onUserTyping(handler: (data: { userName: string }) => void): void;
  removeAllListeners(): void;
  sendTyping(): void;
  stopTyping(): void;
  disconnect(): void;
  requestOnlineFriends(): void;
}