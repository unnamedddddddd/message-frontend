import { Link } from 'react-router-dom';
import './Login.css';
import { useUser } from '@/hooks/user';

const Login = () => {
  const { 
    login,
    password,
    setLogin, 
    setPassword, 
    setIsRemember, 
    handleForm } = useUser();

  return(
    <div className="login-main">
      <div className="login-form-container">
        <form action="" className="login-form" onSubmit={handleForm}>
          <div className="main-form">
            <div className="input-user-data">
              <div className="input-login">
                <label htmlFor="login" className="login-label">
                  Login
                </label>
                <input 
                  value={login}
                  type="text" 
                  className="login" 
                  placeholder="Login"
                  onChange={(e) => setLogin(e.target.value.trim())}
                  />
              </div>
              <div className="input-password">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <input 
                  value={password}
                  type="password" 
                  className="password" 
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value.trim())}
                  />
              </div>    
            </div>
          </div>
            <div className="login-options"> 
              <input 
                type="checkbox" 
                id="login-cbx" 
                onChange={(e) => setIsRemember(e.target.checked)}
                style={{ display: 'none' }} 
              />
              <label htmlFor="login-cbx" className="login-check">
                <svg width="18px" height="18px" viewBox="0 0 18 18">
                  <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                  <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
              </label>
            <label htmlFor="login-cbx" className="login-remember-user">Запомнить?</label>
            <Link
              style={{
                display: 'block',
                textAlign: 'right',
                color: '#5c5e61',
                fontSize: '13px',
                textDecoration: 'none',
                justifyContent: 'flex-end'
              }}
              className='forgotPassword-link'
              to='/forgotPassword'
            >
            Забыли пароль?
            </Link>
          </div>
          <div className="button-container">
            <button className='login-button'>
              sign in
            </button> 
          </div>
          <div className="CreateUser">
              <Link
                to='/createUser'
                style={{
                  display: 'block',
                  textAlign: 'right',
                  fontSize: '16px',
                  textDecoration: 'none',
                  color: '#5c5e61',
                  justifyContent: 'flex-end'
                }}
              >
              Нет аккаунта
              </Link>
          </div>
        </form>
      </div>
    </div>  
  );
} 


export default Login;