import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../chat/useNotification";
import { confirmCode, confirmEmail } from "@/api/user/ConfirmEmail";
import { confirmCodeForgot, sendCode } from "@/api/user/ForgotPassword";

const useVerifyEmail = () => {
  const [verifyStep, setVerifyStep] = useState<'email' | 'code'>('email');
  const [userEmail, setUserEmail] = useState<string>('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleFormSubmitCreateUser = async (e: FormEvent<HTMLFormElement>) => {
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

  const handleFormSubmitForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verifyStep === 'email') {
      const responseEmail = await sendCode(userEmail);
      if (!responseEmail.success) {
        addNotification('error', responseEmail.message);
        return;
      }
      setVerifyStep('code');
      addNotification('info', responseEmail.message);
    } else {
      const responseCode = await confirmCodeForgot(code, userEmail);
      if (!responseCode.success) {
        addNotification('error', responseCode.message);
        return;
      }
      sessionStorage.setItem('verifiedEmail', userEmail);
      sessionStorage.setItem('user-id', responseCode.userId);

      const stageForgot = sessionStorage.getItem('stage-forgot-password');
      if (stageForgot === 'check-verify') {
        sessionStorage.setItem('stage-forgot-password', 'reset-password');
        navigate('/forgotPassword');
      }
    }
  };

  return {
    code,
    verifyStep,
    userEmail,
    setUserEmail,
    setCode,
    handleFormSubmitCreateUser,
    handleFormSubmitForgotPassword,
  }
}

export default useVerifyEmail;