import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../chat/useNotification";
import { confirmCode, confirmEmail } from "@/api/user/ConfirmEmail";

const useVerifyEmail = () => {
  const [verifyStep, setVerifyStep] = useState<'email' | 'code'>('email');
  const [userEmail, setUserEmail] = useState<string>('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verifyStep === 'email') {
      const responseEmail = await confirmEmail(userEmail);
      if (!responseEmail.success) {
        addNotification('error', responseEmail.message);
        return;
      }
      setVerifyStep('code');
      addNotification('info', responseEmail.message);
    } else {
      const responseCode = await confirmCode(code, userEmail);
      if (!responseCode.success) {
        addNotification('error', responseCode.message);
        return;
      }
      sessionStorage.setItem('verifiedEmail', userEmail);
      addNotification('success', 'Верификация прошла успешно');
      navigate('/login');
    }
  };

  return {
    code,
    verifyStep,
    userEmail,
    setUserEmail,
    setCode,
    handleFormSubmit,
  }
}

export default useVerifyEmail;