import SERVER_URL from "../config"

const createUser = async (userLogin:string, userPassword: string) => {
  console.log(userLogin, userPassword);
  
  const request = await fetch('http://localhost:3000/api/createUser', {
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({userLogin, userPassword})
  });

  const serverResponse = await request.json();
  return serverResponse;
}

export default createUser;