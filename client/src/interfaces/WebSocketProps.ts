export default interface IWebSocketClient {
  socket: WebSocket | null;
  connect(): void;
  onMessage(): void;
  onDisconnect(): void;
}