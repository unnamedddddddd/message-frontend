import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "@/api/user/ForgotPassword";
import { useNotification } from "../chat";

const useForgotPassword = () => {
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleFormResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      addNotification('error', 'Пароли не совпадают');
      return;
    }
    
    const userId = sessionStorage.getItem('user-id');
    if (!userId) {
      navigate('/login');
      return;
    }

    const response = await forgotPassword(Number(userId), password);
    if (!response.success) {
      addNotification('error', response.message);
      return;
    }
    sessionStorage.clear();
    addNotification('success', 'Пароль успешно изменён');
    navigate('/login');
  };

  useEffect(() => {
    const stage = sessionStorage.getItem('stage-forgot-password');
    if (stage === 'check-verify' || stage === undefined) {
      sessionStorage.setItem('stage', 'check-verify');
      navigate('verifyEmail');
    }
  }, [navigate])

  return {
    password,
    repeatPassword,
    setPassword,
    setRepeatPassword,
    handleFormResetPassword,
  }
}

export default useForgotPassword;