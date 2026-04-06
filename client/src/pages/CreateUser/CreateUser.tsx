import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '@/api/user';

const CreateUser = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const navigate = useNavigate();
  
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!login || !password || !repeatPassword) {
      alert('Поле обязательное');
      return;
    }

    if (password !== repeatPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    const data = await createUser(login, password);
    if (!data.success) {
      alert(`Ошибка: ${data.message}`);
      return;
    }
    alert('Пользователь создан успешно');
    navigate('/login');
  };

  const inputClass = "bg-[#292929] border-none rounded-[12px] text-[16px] p-[14px_16px] transition-all duration-500 shadow-[inset_#1717188a_2px_2px_12px] text-[#a3a2a3] placeholder:opacity-60 focus:outline-none focus:shadow-[inset_#504f4f8a_2px_2px_12px]";
  const labelClass = "p-[5px] text-[#a3a2a3]";

  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] w-full"> 
        <form 
          className="max-w-[400px] w-full bg-[#353536]/70 p-8 flex flex-col rounded-lg shadow-[0_4px_20px_rgba(23,23,24,0.54)] gap-[15px] text-[14px]" 
          onSubmit={handleForm}
        >
          <div className="flex flex-col w-full gap-4"> 
            
            <div className="flex flex-col">
              <label className={labelClass}>Login</label>
              <input 
                type="text" 
                className={inputClass} 
                placeholder="Login"
                onChange={(e) => setLogin(e.target.value.trim())}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Password</label>
              <input 
                type="password" 
                className={inputClass} 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </div>   

            <div className="flex flex-col">
              <label className={labelClass}>Repeat password</label>
              <input 
                type="password" 
                className={inputClass} 
                placeholder="Repeat password"
                onChange={(e) => setRepeatPassword(e.target.value.trim())}
              />
            </div>     

          </div>

          <div className="flex justify-center mt-2">
            <button className="bg-[#292929] border-none p-[10px] w-full rounded-lg text-[#a3a2a3] transition-colors duration-300 text-[16px] font-semibold hover:bg-[#434548]">
              create user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
