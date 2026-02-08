import { WebSocketChat } from "@/modules";
import type { MessageProps } from "@/types";
import { useRef, useState } from "react";

const useWebSocket = (userLogin: string, handleMessage:(data: MessageProps) => void) => {
  const socketRef = useRef<WebSocketChat | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  const connect = (roomId: string) => {
    if (socketRef.current) {
      disconnect();
    }

    socketRef.current = new WebSocketChat()

    socketRef.current.connect(roomId, userLogin).then(() => {
      socketRef.current?.getMessage(handleMessage);
      setIsConnected(true);
    })
  }

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }

  return { socketRef, isConnected, connect, disconnect };
}

export default useWebSocket;