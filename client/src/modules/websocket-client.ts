import type { Participant } from "@/types";
import { WEBSOCKET_URL } from "../config";
import type MessageProps from "../types/chat/MessageProps";
import type SocketProps from "../types/socket/SocketProps";
import type IWebSocketClient from "../types/socket/WebSocketProps";
import { io } from 'socket.io-client'
import type { SignalData } from "simple-peer";

export default class WebSocketChat implements IWebSocketClient{
  private socket: SocketProps | null = null;
  public socketId: string | undefined = undefined;

  connect(roomId: string, userName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(WEBSOCKET_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 3,
        timeout: 10000,
      });

      this.socket.userName = userName;
      this.socket.currentRoom = roomId;
      this.socketId = this.socket?.id;

      this.socket.emit('join-room', {roomId, userName})

      this.socket.on('connect', () => {
        console.log(`Подключен user ${this.socket?.userName} c id ${this.socket?.id}`)
        resolve();
      })

      this.socket.on('connect-error', (error) => {
        console.log(error);
        reject(error);
      })
    })
  }

  onUserJoinedVoice(handler: (data: {userId: string}) => void): void {
    this.socket?.on('user-join-voice', handler);
  }

  onUserLeftVoice(handler: (data: {userId: string}) => void): void {
    this.socket?.on('user-left-voice', handler);
  }

  getParticipants(): Promise<Participant[]> {    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.socket?.off('voice-chat-participants');
        reject(new Error('Timeout: no participants response'));
      }, 5000);

      this.socket?.on('voice-chat-participants', (participants: Participant[]) => {
        clearTimeout(timeout);
        resolve(participants);
        this.socket?.off('voice-chat-participants');
      });

      this.socket?.emit('voice-chat-participants', { 
        roomId: this.socket?.currentRoom 
      });
    });
  }

  getVoiceSignal(handler: (data: { from: string; signal: SignalData }) => void): void {
    this.socket?.on('voice-signal', handler);
  }

  sendVoiceSignalGroup(signal: unknown, targetSocketId: string): void {
    const roomId = this.socket?.currentRoom;
    this.socket?.emit('voice-signal', {
      to: targetSocketId,
      signal,
      roomId,
    });
  }

  getMessage(handler: (data: MessageProps) => void): void {
    this.socket?.on('message', (data) => {
      handler(data);
      
    });
  }

  joinVoiceChat(): void {
    const roomId = this.socket?.currentRoom;
    this.socket?.emit('user-join-voice', { roomId });
  }

  sendMessage(message: string): void {
    const roomId = this.socket?.currentRoom;
    this.socket?.emit('message', {message, roomId});
  }

  leaveRoom(): void {
    const roomId = this.socket!.currentRoom;
    const userName = this.socket!.userName;
    this.socket?.emit('leave-room', {roomId, userName})
    this.socket!.currentRoom = null;
  }

  disconnect(): void {
    if (!this.socket) return;

    const roomId = this.socket!.currentRoom;
    const userName = this.socket!.userName;
    this.socket?.emit('leave-room', {roomId, userName})

    this.socket.disconnect();

    this.socket.currentRoom = null;
    this.socket = null;   
  }
}