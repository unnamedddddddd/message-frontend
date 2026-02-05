import { useState, type FormEvent } from "react";
import {useNavigate} from 'react-router-dom'
import './ForgotPassword.css'
import forgotPassword from "../../scripts/user/ForgotPassword";

const ForgotPassword = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const navigate = useNavigate();


  // СДЕЛАТЬ ЧЕРЕЗ ПОЧТУ
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    const data = await forgotPassword(login, password);
    console.log(login);
    
    if (!data.success) {
      console.error(data.message);
      alert(`Ошибка: ${data.message}`);
      return
    }
    alert('Пароль успешно изменён');
    navigate('/login');
  }

  return (
    <div className="forgot-main">
      <div className="forgot-form-container">
        <form action="" className="forgot-form" onSubmit={handleForm}>
          <div className="input-user-data">
            <div className="input-login">
              <label htmlFor="" className="login-label">
                Login
              </label>
              <input 
                type="text" 
                className="login" 
                placeholder="Login"
                onChange={(e) => setLogin(e.target.value.trim())}
              />
            </div>
            <div className="input-password">
              <label htmlFor="" className="login-label">
                New Password
              </label>
              <input 
                type="password" 
                className="password" 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value.trim())}
                />
            </div>    
            <div className="input-password">
              <label htmlFor="" className="login-label">
                Repeat new Password
              </label>
              <input 
                type="password" 
                className="password" 
                placeholder="Password"
                onChange={(e) => setRepeatPassword(e.target.value.trim())}
                />
            </div>          
         </div> 
         <div className="button-container">
            <button className="forgot-button">
              change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default ForgotPassword;