import type { SignalData } from "simple-peer";
import type MessageProps from "../chat/MessageProps";
import type Participant from "./ParticipantProps";

export default interface IWebSocketClient {
  socketId: string | undefined; 
  connect(roomId: string, userName: string): Promise<void>;
  getVoiceSignal(handler: (data: { from: string; signal: SignalData }) => void): void;
  sendVoiceSignal(signal: unknown, targetSocketId: string): void;
  sendMessage(message: string): void;
  getMessage(handler: (data: MessageProps) => void): void;
  getParticipants(): Promise<Participant[]>;
  onUserLeftVoice(handler: (data: {userId: string}) => void ): void;
  onUserLeftVoice(handler: (data: {userId: string}) => void ): void;
  disconnect(): void;
}