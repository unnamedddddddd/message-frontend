import type { Participant } from "@/types";
import { WEBSOCKET_URL } from "../config";
import type MessageProps from "../types/chat/MessageProps";
import type SocketProps from "../types/socket/SocketProps";
import type IWebSocketClient from "../types/socket/WebSocketProps";
import { io } from 'socket.io-client'
import type { SignalData } from "simple-peer";

export default class WebSocketChat implements IWebSocketClient{
  public socket: SocketProps | null = null;
  public socketId: string | undefined = undefined;

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(WEBSOCKET_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 3,
        timeout: 10000,
      });      
      this.socketId = this.socket?.id;
      
      this.socket.on('connect', () => {
        console.log(`Подключен user c id ${this.socket?.id}`)
        resolve();
      })

      this.socket.on('connect-error', (error) => {
        console.log(error);
        reject(error);
      })
    })
  }

  joinTextChat(roomId: string, userName: string ): void {
    if (!this.socket) return;
    this.socket.userName = userName;    
    this.socket.roomId = roomId;    
    this.socket?.emit('join-room', {roomId, userName});
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
        roomId: this.socket?.roomId 
      });
    });
  }

  getVoiceSignal(handler: (data: { from: string; signal: SignalData }) => void): void {
    this.socket?.on('voice-signal', handler);
  }

  sendVoiceSignalGroup(signal: unknown, targetSocketId: string): void {
    const roomId = this.socket?.roomId;
    this.socket?.emit('voice-signal', {
      to: targetSocketId,
      signal,
      roomId,
    });
  }

  getMessage(handler: (data: MessageProps) => void): void {
    this.socket?.on('message', (data) => {      
      console.log(data);
      
      handler(data);
    });
  }

  joinVoiceChat(): void {
    const roomId = this.socket?.roomId;
    this.socket?.emit('user-join-voice', { roomId });
  }

  sendMessage(message: string): void {
    const roomId = this.socket?.roomId;
    console.log('отправил');
    
    this.socket?.emit('message', {message, roomId});
  }

  leaveRoom(): void {
    if (!this.socket) return
      
    const { roomId, userName } = this.socket;
    this.socket?.emit('leave-room', {roomId, userName})
    this.socket!.roomId = null;
  }

  offMessage(): void {
    this.socket?.off('message');
  }

  sendTyping(): void {
    if (!this.socket) return;
    const { roomId, userName } = this.socket;
    
    this.socket?.emit('send-typing', { roomId, userName });
  }

  stopTyping(): void {
    if (!this.socket) return;
    const { roomId, userName } = this.socket;
    this.socket?.emit('stop-typing', { roomId, userName });
  }

  onUserTyping(handler: (data: { userName: string}) => void): void {
    this.socket?.on('send-typing', handler);
  }

  onUserStopTyping(handler: (data: { userName: string}) => void): void {
    this.socket?.on('stop-typing', handler);
  }

  removeAllListeners(): void {
    this.socket?.removeAllListeners();
  }

  disconnect(): void {
    if (!this.socket) return;

    const { roomId, userName } = this.socket;
    this.socket?.emit('leave-room', {roomId, userName})

    this.socket.disconnect();

    this.socket.roomId = null;
    this.socket = null;   
  }
}