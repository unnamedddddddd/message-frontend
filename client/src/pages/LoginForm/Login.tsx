import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/user';

const Login = () => {
  const { 
    login,
    password,
    setLogin, 
    setPassword, 
    setIsRemember, 
    handleForm } = useUser();

  return (
    <div className="min-h-screen p-5 login-main">
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] w-full">
        <form 
          className="max-w-[400px] w-full bg-[#353536]/70 p-8 flex flex-col rounded-lg shadow-[0_4px_20px_rgba(23,23,24,0.54)] gap-[15px] text-[14px]"
          onSubmit={handleForm}
        >
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col">
              <label htmlFor="login" className="p-[5px] text-[#a3a2a3]">Login</label>
              <input 
                id="login"
                value={login}
                type="text" 
                className="bg-[#292929] border-none rounded-[12px] text-[16px] p-[14px_16px] transition-all duration-500 shadow-[inset_#1717188a_2px_2px_12px] text-[#a3a2a3] placeholder:opacity-60 focus:outline-none focus:shadow-[inset_#504f4f8a_2px_2px_12px]" 
                placeholder="Login"
                onChange={(e) => setLogin(e.target.value.trim())}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="p-[5px] text-[#a3a2a3]">Password</label>
              <input 
                id="password"
                value={password}
                type="password" 
                className="bg-[#292929] border-none rounded-[12px] text-[16px] p-[14px_16px] transition-all duration-500 shadow-[inset_#1717188a_2px_2px_12px] text-[#a3a2a3] placeholder:opacity-60 focus:outline-none focus:shadow-[inset_#504f4f8a_2px_2px_12px]" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </div>    
          </div>

          <div className="flex flex-row py-[2px] items-center justify-between"> 
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="login-cbx" 
                className="hidden" 
                onChange={(e) => setIsRemember(e.target.checked)}
              />
              <label htmlFor="login-cbx" className="login-check">
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                  <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                  <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
              </label>
              <label htmlFor="login-cbx" className="ml-2 text-[#a3a2a3] cursor-pointer select-none">
                Запомнить?
              </label>
            </div>

            <Link className="text-[#5c5e61] text-[13px] no-underline hover:text-[#a3a2a3]" to="/forgotPassword">
              Забыли пароль?
            </Link>
          </div>

          <button className="bg-[#292929] border-none p-[10px] w-full rounded-lg text-[#a3a2a3] transition-colors duration-300 text-[16px] font-semibold hover:bg-[#434548]">
            sign in
          </button> 

          <Link to="/createUser" className="text-right text-[#5c5e61] text-[16px] no-underline hover:text-[#a3a2a3]">
            Нет аккаунта
          </Link>
        </form>
      </div>
    </div>  
  );
}

export default Login;
