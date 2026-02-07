import { SERVER_URL } from "../../config";

const verificationTokenRemember = async () => {
  const request = await fetch(`${SERVER_URL}/api/verificationTokenRemember`, {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default verificationTokenRemember;
