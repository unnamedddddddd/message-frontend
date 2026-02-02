import { useState, type FormEvent } from 'react';
import './Login.css'
import createUser from '../../scripts/CreateUser';
import {useNavigate } from 'react-router-dom'


const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await createUser(login, password);
    if (data.success) {
      localStorage.setItem('user_id', data.user_id);
      navigate('/home');
    }
    console.log(data.message)
  }

  return(
    <div className="login-main">
      <div className="login-form-container">
        <form action="" className="login-form" onSubmit={handleForm}>
          <div className='auth-label'>
            <label htmlFor="" className='auth'>
              Sign in
            </label>
          </div>
          <div className="main-form">
            <div className="input-user-data">
              <div className="input-login">
                <label htmlFor="" className="login-label">
                  Login
                </label>
                <input 
                  type="text" 
                  className="login" 
                  placeholder="Enter Login"
                  onChange={(e) => setLogin(e.target.value)}
                  />
              </div>
              <div className="input-password">
                <label htmlFor="" className="login-label">
                  Password
                </label>
                <input 
                  type="password" 
                  className="password" 
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <div className="remember-me">
              </div>
              <div className="button-container">
                <button className='login-button'>
                  Sign in
                </button> 
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>  
  );
} 


export default Login;