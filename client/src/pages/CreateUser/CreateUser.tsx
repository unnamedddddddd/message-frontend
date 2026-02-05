import { useState, type FormEvent } from 'react';
import {useNavigate} from 'react-router-dom'
import './CreateUser.css'
import createUser from '../../scripts/user/CreateUser';


const CreateUser = () => {
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
    
    const data = await createUser(login, password);
    if (!data.success) {
      console.error(data.message);
      alert(`Ошибка: ${data.message}`);
      return
    }
    alert('Пользователь создан успешно');
    navigate('/login');
  }

  return (
    <div className="create-main">
      <div className="create-form-container">
        <form action="" className='create-form' onSubmit={handleForm}>
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
            <div className="input-password">
              <label htmlFor="" className="login-label">
                Password
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
                Repeat password
              </label>
              <input 
                type="password" 
                className="password" 
                placeholder="Repeat password"
                onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>     
            </div>
          </div>
            <div className='button-container'> 
              <button className="create-button">
                create user
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};


export default CreateUser;