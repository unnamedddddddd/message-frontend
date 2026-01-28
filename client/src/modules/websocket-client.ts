import SERVER_URL from "../config";
import type IWebSocketClient from "../interfaces/WebSocketProps";

export default class WebSocketChat implements IWebSocketClient{
  private socket: WebSocket | null = null;

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(SERVER_URL);

      this.socket.onopen = () => {
        console.log('Подключено')
        resolve();
      }
      
      this.socket.onerror = (error) => {
        console.log(error);
        reject();
      }
    })
  }

  getMessage(handler: (data: string) => void): void {
    this.socket!.onmessage = (event: MessageEvent) => {
      console.log(`Message: ${event.data}`);
      handler(event.data);
    }
  }

  sendMessage(message: string): void {
    this.socket?.send(message);
  }

  disconnect(): void {
    this.socket?.close();
  }
}