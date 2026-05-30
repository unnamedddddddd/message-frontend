import type { ProfileDetailsProps } from "@/types";
import { SERVER_URL } from "@/config";

const editUserProfileDetails = async (userDetails: ProfileDetailsProps) => {
  console.log(userDetails);
  
  const request = await fetch(`${SERVER_URL}/api/user/profile`, {
    method: 'PATCH',
    headers:{'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({userDetails}),
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default editUserProfileDetails;
