import type { MessageProps, OnlineFriendsResponseProps, Participant, SocketProps } from "@/types";
import { io } from "socket.io-client";
import type { SignalData } from "simple-peer";
import { WEBSOCKET_URL } from "@/config";
import type IWebSocketClient from "@/types/socket/WebSocketProps";

export default class WebSocketChat implements IWebSocketClient {
  public socket: SocketProps | null = null;

  public socketId: string | undefined = undefined;

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(WEBSOCKET_URL, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        reconnectionAttempts: 3,
        timeout: 10000,
      });

      this.socket.on("connect", () => {
        this.socketId = this.socket?.id;

        console.log(`Подключен user c id ${this.socket?.id}`);

        resolve();
      });

      this.socket.on("connect_error", error => {
        console.log(error);

        reject(error);
      });
    });
  }

  getSocketId(): string | undefined {
    return this.socket?.id;
  }

  joinTextChat(
    roomId: string,
    userName: string,
    chatType: "server" | "personal"
  ): void {
    if (!this.socket) return;

    this.socket.userName = userName;
    this.socket.roomId = roomId;

    this.socket.emit("join-room", {
      roomId,
      userName,
      chatType,
    });
  }

  joinVoiceChat(): void {
    const roomId = this.socket?.roomId;

    this.socket?.emit("user-join-voice", {
      roomId,
    });
  }

  leaveVoiceChat(): void {
    const roomId = this.socket?.roomId;

    this.socket?.emit("user-left-voice", {
      roomId,
    });
  }

  getParticipants(): Promise<Participant[]> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.socket?.off("voice-chat-participants");

        reject(new Error("Timeout"));
      }, 5000);

      this.socket?.once(
        "voice-chat-participants",
        (participants: Participant[]) => {
          clearTimeout(timeout);

          resolve(participants);
        }
      );

      this.socket?.emit("voice-chat-participants", {
        roomId: this.socket?.roomId,
      });
    });
  }

  sendVoiceSignalGroup(
    signal: SignalData,
    targetSocketId: string
  ): void {
    this.socket?.emit("voice-signal", {
      to: targetSocketId,
      signal,
    });
  }

  getVoiceSignal( handler: (data: { from: string; signal: SignalData }) => void ): void {
    this.socket?.off("voice-signal");
    this.socket?.on("voice-signal", (data) => {
      console.log('[WebSocketChat] voice-signal received:', data.from, data.signal?.type);
      handler(data);
    });
  }

  onUserJoinedVoice(
    handler: (data: { userId: string }) => void
  ): void {
    this.socket?.on("user-join-voice", handler);
  }

  onUserLeftVoice(
    handler: (data: { userId: string }) => void
  ): void {
    this.socket?.on("user-left-voice", handler);
  }

  offVoiceEvents(): void {
    this.socket?.off("voice-signal");
    this.socket?.off("user-join-voice");
    this.socket?.off("user-left-voice");
  }

  getMessage(handler: (data: MessageProps) => void): void {
    this.socket?.on("message", data => {
      handler(data);
    });
  }

  sendMessage(message: string): void {
    const roomId = this.socket?.roomId;

    this.socket?.emit("message", {
      message,
      roomId,
    });
  }

  leaveRoom(): void {
    if (!this.socket) return;

    const { roomId, userName } = this.socket;

    this.socket.emit("leave-room", {
      roomId,
      userName,
    });

    this.socket.roomId = null;
  }

  offMessage(): void {
    this.socket?.off("message");
  }

  sendTyping(): void {
    if (!this.socket) return;

    const { roomId, userName } = this.socket;

    this.socket.emit("send-typing", {
      roomId,
      userName,
    });
  }

  stopTyping(): void {
    if (!this.socket) return;

    const { roomId, userName } = this.socket;

    this.socket.emit("stop-typing", {
      roomId,
      userName,
    });
  }

  onUserTyping(handler: (data: { userName: string }) => void): void {
    this.socket?.on("send-typing", handler);
  }

  onUserStopTyping(
    handler: (data: { userName: string }) => void
  ): void {
    this.socket?.on("stop-typing", handler);
  }

  onOnlineFriends(
    handler: (data: OnlineFriendsResponseProps[]) => void
  ): void {
    this.socket?.on("online-users", handler);
  }

  requestOnlineFriends(): void {
    this.socket?.emit("online-users");
  }

  sendPing(): void {
    this.socket?.emit("ping-online");
  }

  removeAllListeners(): void {
    this.socket?.removeAllListeners();
  }

  disconnect(): void {
    if (!this.socket) return;

    this.socket.disconnect();

    this.socket = null;
  }
}