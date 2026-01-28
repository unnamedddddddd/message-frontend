import SERVER_URL from "../config";
import type IWebSocketClient from "../interfaces/WebSocketProps";

export default class WebSocketChat implements IWebSocketClient{
  socket: WebSocket | null = null;
  
  connect(): void  {
    this.socket = new WebSocket(SERVER_URL);
  } 

  onMessage(event: Event | undefined, MessageEvent: { new <T>(type: string, eventInitDict?: MessageEventInit<T>): MessageEvent<T>; prototype: MessageEvent; }): void {
    this.socket!.onmessage = (event: MessageEvent): void  => {
      console.log(event.data);
    }
  }

  onDisconnect(): void {
    this.socket?.close();
  }
}