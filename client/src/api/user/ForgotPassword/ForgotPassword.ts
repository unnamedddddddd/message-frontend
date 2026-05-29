import { SERVER_URL } from "../../../config";

const forgotPassword = async (userId: number, newUserPassword: string) => {
  const request = await fetch(`${SERVER_URL}/api/forgotPassword`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({userId, newUserPassword})
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default forgotPassword;