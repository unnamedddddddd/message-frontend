import { SERVER_URL } from "../config"

const forgotPassword = async (userLogin:string, newUserPassword: string) => {
  const request = await fetch(`${SERVER_URL}/api/forgotPassword`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({userLogin, newUserPassword})
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default forgotPassword;