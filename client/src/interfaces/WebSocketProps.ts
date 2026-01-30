import type MessageProps from "./MessageProps";

export default interface IWebSocketClient {
  connect(): Promise<void>;
  sendMessage(message: string): void;
  getMessage(handler: (data: MessageProps) => void): void;
  disconnect(): void;
}