import type MessageProps from "./MessageProps";

export default interface IWebSocketClient {
  connect(roomId: string, userName: string): Promise<void>;
  sendMessage(message: string): void;
  getMessage(handler: (data: MessageProps) => void): void;
  disconnect(): void;
}