import SocketContext from "@/contexts/SocketContext";
import { useContext } from "react"

export const useWebSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within SocketProvider");
  }
  return context;
}

export default useWebSocket;