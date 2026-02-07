import { LoginUser } from "@/api/user";
import verificationTokenRemember from "@/api/user/VerificationTokenRemember";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

const useUser = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkTokenRemember = useCallback(async () => {
  try {
    const data = await verificationTokenRemember();
    if (data.success) {
      localStorage.setItem('user_id', data.user_id);
      navigate('/home');
    }
  } catch(error) {
    console.error(error);
  }
}, [navigate]); 

  useEffect(() => {
    checkTokenRemember();
  }, [checkTokenRemember]);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {    
    e.preventDefault();
    const data = await LoginUser(login, password, isRemember);
    console.log(data);
    
    if (!data.success) {
      console.error(data.message)
      alert(`Ошибка: ${data.message}`);
      return;
    }
    localStorage.setItem('user_id', data.user_id);
    navigate('/home');
  }

  return { 
    login, 
    setLogin, 
    password, 
    setPassword, 
    isRemember, 
    setIsRemember, 
    handleForm 
  };
}


export default useUser;