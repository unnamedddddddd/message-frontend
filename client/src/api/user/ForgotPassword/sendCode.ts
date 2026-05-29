import { SERVER_URL } from "../../../config";

const sendCode = async (userEmail: string) => {
  const request = await fetch(`${SERVER_URL}/api/auth/send-reset-code`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userEmail})
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default sendCode;
