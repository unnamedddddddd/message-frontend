import { useForgotPassword } from "@/hooks/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const {
    handleFormResetPassword,
    setPassword,
    setRepeatPassword
  } = useForgotPassword();
  const navigate = useNavigate();

  const inputClass = "bg-black/60 border border-white/[0.08] rounded-xl text-[16px] p-[14px_16px] text-[#a3a2a3] placeholder:text-[#a3a2a3]/40 focus:outline-none focus:border-white/20 transition-colors";
  const labelClass = "p-[5px] text-[#a3a2a3]/80 text-sm";
 
  useEffect(() => {
      const stage = sessionStorage.getItem('stage-forgot-password');
      if (stage === 'check-verify' || stage === null) {
        sessionStorage.setItem('stage-forgot-password', 'check-verify');
        navigate('/verifyEmail');
      }
  }, [navigate])

  return (
    <div className="min-h-screen p-5 flex justify-center items-center">
      <div className="max-w-[400px] w-full">
        <form
          className="bg-[#0d0d0f]/80 backdrop-blur-xl border border-white/[0.07] p-8 flex flex-col rounded-2xl gap-4 shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
          onSubmit={handleFormResetPassword}
        >
          <h1 className="text-2xl font-bold text-white tracking-tight">Восстановить пароль</h1>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Новый пароль</label>
            <input type="password" className={inputClass} placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value.trim())} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Повторите пароль</label>
            <input type="password" className={inputClass} placeholder="Повторите пароль" onChange={(e) => setRepeatPassword(e.target.value.trim())} />
          </div>

          <button className="bg-white/[0.08] border border-white/[0.1] p-[10px] w-full rounded-lg text-[#a3a2a3] font-semibold hover:bg-white/[0.14] hover:text-white transition-all">
            change password
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="bg-transparent border border-white/25 p-3 rounded-full text-[#a3a2a3] font-semibold hover:scale-105 hover:border-white/50 hover:text-white active:scale-95 transition-all"
          >
            Назад к входу
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
