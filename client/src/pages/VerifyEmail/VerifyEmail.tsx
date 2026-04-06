import { useState, type FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { confirmCode, confirmEmail } from '@/api/user/ConfirmEmail';
import { useNotification } from '@/hooks/chat/useNotification';

const VerifyEmail = () => {  
  const [verifyStep, setVerifyStep] = useState<'email' | 'code'>('email');
  const [userEmail, setUserEmail] = useState<string>('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {  
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      navigate('/login');
      return;
    }

    if (verifyStep === 'email') {
      const responseEmail = await confirmEmail(Number(userId), userEmail);
      if (!responseEmail.success) {
        addNotification('error', responseEmail.message);
        return;
      }
      setVerifyStep('code');
      addNotification('info', responseEmail.message);
    } else {
      const responseCode = await confirmCode(Number(userId), code);
      if (!responseCode.success) {
        addNotification('error', responseCode.message);
        return;
      }
      navigate('/profile');
    }
  };

  const inputClass = "bg-[#292929] border-none rounded-[12px] text-[16px] p-[14px_16px] transition-all duration-500 shadow-[inset_#1717188a_2px_2px_12px] text-[#a3a2a3] placeholder:opacity-60 focus:outline-none focus:shadow-[inset_#504f4f8a_2px_2px_12px]";
  const labelClass = "p-[5px] text-[#a3a2a3]";
  const buttonClass = "bg-[#292929] border-none p-[10px] w-full rounded-lg text-[#a3a2a3] transition-colors duration-300 text-[16px] font-semibold hover:bg-[#434548]";

  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] w-full"> 
        <form 
          className="max-w-[400px] w-full bg-[#353536]/70 p-8 flex flex-col rounded-lg shadow-[0_4px_20px_rgba(23,23,24,0.54)] gap-[15px] text-[14px]" 
          onSubmit={handleFormSubmit}
        >
          {verifyStep === 'email' ? (
            <>
              <div className="flex flex-col w-full"> 
                <label htmlFor="email" className={labelClass}>Email</label>
                <input 
                  id="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  type="email"  
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button type="submit" className={buttonClass}>
                  Send Code
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col w-full"> 
                <label htmlFor="code" className={labelClass}>Enter 6-digit Code</label>
                <input 
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"  
                  className={inputClass}
                  maxLength={6}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button type="submit" className={buttonClass}>
                  Confirm Code
                </button>
              </div>  
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
