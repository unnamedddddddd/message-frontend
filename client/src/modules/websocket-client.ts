import { WEBSOCKET_URL } from "../config";
import type MessageProps from "../interfaces/chat/MessageProps";
import type SocketProps from "../interfaces/socket/SocketProps";
import type IWebSocketClient from "../interfaces/socket/WebSocketProps";
import { io } from 'socket.io-client'

export default class WebSocketChat implements IWebSocketClient{
  private socket: SocketProps | null = null;

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

      this.socket.emit('join-room', {roomId, userName})

      this.socket.on('connect', () => {
        console.log(`Подключен user ${this.socket?.userName} c id ${this.socket?.id}`)
        resolve();
      })

      this.socket.on('connect_error', (error) => {
        console.log(error);
        reject();
      })
    })
  }

  getMessage(handler: (data: MessageProps) => void): void {
    this.socket?.on('message', (data) => {
      console.log(data);
      handler(data);
    });
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