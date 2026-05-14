import { Link } from 'react-router-dom';
import { useCreateUser, useUser } from '@/hooks/user';
import { useState, type FormEvent } from 'react';

const Login = () => {
  const {
    login,
    password,
    setLogin,
    setPassword,
    setIsRemember,
    handleForm
  } = useUser();

  const {
    createLogin,
    createPassword,
    repeatcreatePassword,
    setRepeatCreatePassword,
    setCreateLogin,
    setCreatePassword,
    handleCreateUserForm
  } = useCreateUser();

  const [isLogin, setIsLogin] = useState(true);
  const handleCreateAnimate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await handleCreateUserForm();
    if (success) {
      setIsLogin(true);
    }
  }

  return (
    <div className="min-h-screen p-5 flex justify-center items-center bg-[#0A0A0A]/90">
      <div className="relative w-full max-w-[900px] h-[500px] overflow-hidden rounded-xl">
        <form
          className="absolute left-0 top-0 w-1/2 h-full bg-[#0A0A0A]/70 p-8 flex flex-col gap-4 overflow-y-auto transition-all duration-500"
          style={{ transform: isLogin ? 'translateX(0)' : 'translateX(-100%)' }}
          onSubmit={handleForm}
        >
          <h1 className="text-2xl font-bold text-white">Войти в Drokcsid</h1>
          
          <div className="flex items-center justify-center gap-2">
            <button className='bg-transparent border border-[#a3a2a3] p-2 rounded-full' type='button'>
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-[#a3a2a3]">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </button>
            <button className='bg-transparent border border-[#a3a2a3] p-2 rounded-full' type='button'>
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 fill-[#a3a2a3]'>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </button>
          </div>

          <span className='text-sm font-bold text-white text-center'>или используйте свой логин и пароль</span>

          <div className="flex flex-col gap-1">
            <label className="p-[5px] text-[#a3a2a3]">Login</label>
            <input
              value={login}
              type="text"
              className="bg-[#1E1E1E] rounded-xl text-[16px] p-[14px_16px] text-[#a3a2a3] focus:outline-none"
              placeholder="Login"
              onChange={(e) => setLogin(e.target.value.trim())}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="p-[5px] text-[#a3a2a3]">Password</label>
            <input
              value={password}
              type="password"
              className="bg-[#1E1E1E] rounded-xl text-[16px] p-[14px_16px] text-[#a3a2a3] focus:outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value.trim())}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="login-cbx" className="hidden" onChange={(e) => setIsRemember(e.target.checked)} />
              <label htmlFor="login-cbx" className="login-check">
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                  <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                  <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
              </label>
              <label htmlFor="login-cbx" className="ml-2 text-[#a3a2a3] cursor-pointer">Запомнить?</label>
            </div>
            <Link className="text-[#5c5e61] text-[13px] hover:text-[#a3a2a3]" to="/forgotPassword">Забыли пароль?</Link>
          </div>

          <button className="bg-[#3A3A3A] p-[10px] w-full rounded-lg text-[#a3a2a3] font-semibold hover:bg-[#555555]">
            sign in
          </button>
        </form>
        <form
          className="absolute right-0 top-0 w-1/2 h-full bg-[#0A0A0A]/70 p-8 flex flex-col gap-4 overflow-y-auto transition-all duration-500"
          style={{ transform: isLogin ? 'translateX(100%)' : 'translateX(0)' }}
          onSubmit={handleCreateAnimate}
        >
          <h1 className="text-2xl font-bold text-white">Создать аккаунт</h1>

          <div className="flex flex-col gap-1">
            <label className="p-[5px] text-[#a3a2a3]">Login</label>
            <input
              type="text"
              value={createLogin}
              className="bg-[#1E1E1E] rounded-xl text-[16px] p-[14px_16px] text-[#a3a2a3] focus:outline-none"
              onChange={(e) => setCreateLogin(e.target.value)}
              placeholder="Login"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="p-[5px] text-[#a3a2a3]">Password</label>
            <input
              type="password"
              value={createPassword}
              className="bg-[#1E1E1E] rounded-xl text-[16px] p-[14px_16px] text-[#a3a2a3] focus:outline-none"
              placeholder="Password"
              onChange={(e) => setCreatePassword(e.target.value)}
            />
          </div>

           <div className="flex flex-col gap-1">
            <label className="p-[5px] text-[#a3a2a3]">Repeat Password</label>
            <input
              type="password"
              value={repeatcreatePassword}
              className="bg-[#1E1E1E] rounded-xl text-[16px] p-[14px_16px] text-[#a3a2a3] focus:outline-none"
              placeholder="Repeat Password"
              onChange={(e) => setRepeatCreatePassword(e.target.value)}
            />
          </div>

          <button className="bg-[#3A3A3A] p-[10px] w-full rounded-lg text-[#a3a2a3] font-semibold hover:bg-[#555555]">
            sign up
          </button>
        </form>
        <div
          className="absolute top-0 w-1/2 h-full bg-[#1a1a1a] flex flex-col justify-around items-center p-6 transition-all duration-500 z-10"
          style={{ left: isLogin ? '50%' : '0%' }}
        >
          {isLogin ? (
            <>
              <div />
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-xl font-bold text-white">Добро пожаловать!</h2>
                <p className="text-[#a3a2a3] text-sm">Мы рады видеть вас снова</p>
              </div>
              <button
                onClick={() => setIsLogin(false)}
                className="min-w-[200px] bg-transparent border border-[#a3a2a3] p-3 rounded-full text-[#a3a2a3] font-semibold hover:scale-105 active:scale-95 transition-all"
              >
                Создать аккаунт
              </button>
            </>
          ) : (
            <>
              <div />
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-xl font-bold text-white">Уже есть аккаунт?</h2>
                <p className="text-[#a3a2a3] text-sm">Войдите чтобы продолжить</p>
              </div>
              <button
                onClick={() => setIsLogin(true)}
                className="min-w-[200px] bg-transparent border border-[#a3a2a3] p-3 rounded-full text-[#a3a2a3] font-semibold hover:scale-105 active:scale-95 transition-all"
              >
                Войти
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;
