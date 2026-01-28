import SERVER_URL from "../config";

const createConnection = () => {
  const socket = new WebSocket(SERVER_URL);

  return () => {
    socket?.close();
  };
}

export default createConnection;