import './Login.css'

const Login = () => {


  return(
    <>
      <div className="login-main">
        <div className="login-form-container">
          <form action="" className="login-form">
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
                  <input type="text" className="login" placeholder="Enter Login"/>
                </div>
                <div className="input-password">
                   <label htmlFor="" className="login-label">
                    Password
                  </label>
                  <input type="password" className="password" placeholder="Enter Password"/>
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
    </>
  );
} 


export default Login;