import { SERVER_URL } from "@/config";

const createServer = async (serverName: string, file: File, userId: string) => {
  const formData = new FormData();
  formData.append('user_id', userId);
  formData.append('server_name', serverName)
  formData.append('avatar', file);

  const response = await fetch(`${SERVER_URL}/api/servers/createServer`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });

  const serverResponse = await response.json();
  return serverResponse;
}

export default createServer;