import type { SignalData } from "simple-peer";
import type MessageProps from "../chat/MessageProps";
import type Participant from "./ParticipantProps";

export default interface IWebSocketClient {
  socketId: string | undefined; 
  connect(userName: string): Promise<void>;
  joinTextChat(roomId: string, userName: string): void;
  getVoiceSignal(handler: (data: { from: string; signal: SignalData }) => void): void;
  sendVoiceSignalGroup(signal: unknown, targetSocketId: string): void;
  sendMessage(message: string): void;
  getMessage(handler: (data: MessageProps) => void): void;
  getParticipants(): Promise<Participant[]>;
  onUserLeftVoice(handler: (data: {userId: string}) => void ): void;
  onUserJoinedVoice(handler: (data: {userId: string}) => void ): void;
  offMessage(): void;
  joinVoiceChat(): void;
  disconnect(): void;
}