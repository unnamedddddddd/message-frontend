import useVerifyEmail from "@/hooks/user/useVerifyEmail";
import type { FormEvent } from "react";

const VerifyEmail = () => {
  const {
    handleFormSubmitCreateUser,
    handleFormSubmitForgotPassword,
    setCode,
    setUserEmail,
    verifyStep,
    userEmail,
    code,
  } = useVerifyEmail();

  const inputClass = "bg-black/60 border border-white/[0.08] rounded-xl text-[16px] p-[14px_16px] text-[#a3a2a3] placeholder:text-[#a3a2a3]/40 focus:outline-none focus:border-white/20 transition-colors";
  const labelClass = "p-[5px] text-[#a3a2a3]/80 text-sm";

  const handleCheckStage = (e: FormEvent<HTMLFormElement>) => {
    const stage = sessionStorage.getItem('stage-forgot-password');    
    if (stage === 'check-verify') {
      handleFormSubmitForgotPassword(e);
    } else {
      handleFormSubmitCreateUser(e);
    }
  }

  return (
    <div className="min-h-screen p-5 flex justify-center items-center">
      <div className="max-w-[400px] w-full">
        <form
          className="bg-[#0d0d0f]/80 backdrop-blur-xl border border-white/[0.07] p-8 flex flex-col rounded-2xl gap-4 shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
          onSubmit={handleCheckStage}
        >
          <h1 className="text-2xl font-bold text-white tracking-tight">Подтверждение Email</h1>

          {verifyStep === 'email' ? (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" className={inputClass} required />
              </div>
              <button type="submit" className="bg-white/[0.08] border border-white/[0.1] p-[10px] w-full rounded-lg text-[#a3a2a3] font-semibold hover:bg-white/[0.14] hover:text-white transition-all">
                Отправить код
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="code" className={labelClass}>Enter 6-digit Code</label>
                <input id="code" value={code} onChange={(e) => setCode(e.target.value)} type="text" className={inputClass} maxLength={6} required />
              </div>
              <button type="submit" className="bg-white/[0.08] border border-white/[0.1] p-[10px] w-full rounded-lg text-[#a3a2a3] font-semibold hover:bg-white/[0.14] hover:text-white transition-all">
                Подтвердить код
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
