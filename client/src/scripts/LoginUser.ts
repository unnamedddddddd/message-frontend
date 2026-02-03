import { SERVER_URL } from "../config";

const loginUser = async (userLogin:string, userPassword: string) => {
  const request = await fetch(`${SERVER_URL}/api/login`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userLogin, userPassword})
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default loginUser;
