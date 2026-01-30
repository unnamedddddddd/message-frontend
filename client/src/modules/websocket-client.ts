import SERVER_URL from "../config";
import type MessageProps from "../interfaces/MessageProps";
import type IWebSocketClient from "../interfaces/WebSocketProps";
import { io, Socket } from 'socket.io-client'

export default class WebSocketChat implements IWebSocketClient{
  private socket: Socket | null = null;

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(SERVER_URL);

      this.socket.on('connect', () => {
        console.log('Подключеноc c id', this.socket?.id)
        resolve();
      })

      this.socket.on('connect_error', (error) => {
        console.log(error);
        reject();
      })
    })
  }

  getMessage(handler: (data: MessageProps) => void): void {
    this.socket!.on('message', (data) => {
      console.log(data);
      handler(data);
    });
  }

  sendMessage(message: string): void {
    this.socket?.emit('message', message);
  }

  disconnect(): void {
    this.socket?.disconnect();
  }
}