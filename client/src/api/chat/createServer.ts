import { SERVER_URL } from "@/config";

const createServer = async (serverName: string, file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const response = await fetch(`${SERVER_URL}/api/servers/createServer/${serverName}`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });

  const serverResponse = await response.json();
  return serverResponse;
}

export default createServer;