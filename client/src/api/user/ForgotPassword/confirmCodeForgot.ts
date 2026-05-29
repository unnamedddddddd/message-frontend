import { SERVER_URL } from "../../../config";

const confirmCodeForgot = async (userCode: string, userEmail: string) => {
  const request = await fetch(`${SERVER_URL}/api/auth/verify-reset-code`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userCode, userEmail})
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default confirmCodeForgot;
