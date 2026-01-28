export default interface IWebSocketClient {
  connect(): Promise<void>;
  sendMessage(message: string): void;
  getMessage(handler: (data: string) => void): void;
  disconnect(): void;
}