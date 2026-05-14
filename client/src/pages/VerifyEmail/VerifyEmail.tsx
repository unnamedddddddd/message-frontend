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

  const inputClass = "bg-black/60 border border-white/[0.08] rounded-xl text-[16px] p-[14px_16px] text-[#a3a2a3] placeholder:text-[#a3a2a3]/40 focus:outline-none focus:border-white/20 transition-colors";
  const labelClass = "p-[5px] text-[#a3a2a3]/80 text-sm";

  return (
    <div className="min-h-screen p-5 flex justify-center items-center">
      <div className="max-w-[400px] w-full">
        <form
          className="bg-[#0d0d0f]/80 backdrop-blur-xl border border-white/[0.07] p-8 flex flex-col rounded-2xl gap-4 shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-2xl font-bold text-white tracking-tight">Подтверждение Email</h1>

          {verifyStep === 'email' ? (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" className={inputClass} required />
              </div>
              <button type="submit" className="bg-white/[0.08] border border-white/[0.1] p-[10px] w-full rounded-lg text-[#a3a2a3] font-semibold hover:bg-white/[0.14] hover:text-white transition-all">
                Send Code
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="code" className={labelClass}>Enter 6-digit Code</label>
                <input id="code" value={code} onChange={(e) => setCode(e.target.value)} type="text" className={inputClass} maxLength={6} required />
              </div>
              <button type="submit" className="bg-white/[0.08] border border-white/[0.1] p-[10px] w-full rounded-lg text-[#a3a2a3] font-semibold hover:bg-white/[0.14] hover:text-white transition-all">
                Confirm Code
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
