import SocketContext from "@/contexts/SocketContext";
import { useContext } from "react"

export const useWebSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}

export default useWebSocket;