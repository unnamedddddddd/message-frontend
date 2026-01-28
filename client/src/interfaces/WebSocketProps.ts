export default interface IWebSocketClient {
  connect(): Promise<void>;
  sendMessage(message: string): void;
  getMessage(handler: (message: string) => void): void;
  disconnect(): void;
}