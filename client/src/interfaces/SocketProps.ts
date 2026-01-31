import type { Socket } from "socket.io-client";

export default interface SocketProps extends Socket{
  userName?: string;
  currentRoom?: string| null;
}