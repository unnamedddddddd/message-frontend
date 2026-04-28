import { SERVER_URL } from "../../config";

const getFindUsers = async (text: string) => {
  const request = await fetch(`${SERVER_URL}/api/users/find?search=${text}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default getFindUsers;
