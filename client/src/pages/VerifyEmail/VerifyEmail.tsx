import { useState, type FormEvent } from 'react';
import './VerifyEmail.css'
import { useNavigate } from "react-router-dom";
import { confirmCode, confirmEmail } from '@/api/user/ConfirmEmail';


const VerifyEmail = () => {  
  const [verifyStep, setVerifyStep] = useState<'email' | 'code'>('email');
  const [userEmail, setUserEmail] = useState<string>('')
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {  
    e.preventDefault();
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        navigate('/login');
        return;
      }

      if (verifyStep === 'email') {
        const responseEmail = await confirmEmail(Number(userId), userEmail);
        if (!responseEmail.success) {
          console.error(responseEmail.message);
          alert(responseEmail.message);
          return;
        }
        setVerifyStep('code');
        alert(responseEmail.message)
    } else {
      const responseCode = await confirmCode(Number(userId), code)
      if (!responseCode.success) {
        console.error(responseCode.message);
        alert(responseCode.message)
        return;
      }
      navigate('/profile')
    }
  }

  return (
    <div className="verify-main">
      <div className="verify-form-container">
        <form className="verify-form" onSubmit={handleFormSubmit}>
          {verifyStep === 'email' ? (
            <>
              <div className="input-confirm">
                <label htmlFor="email" className='label-email'>Email</label>
                <input 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  type="email"  
                  className="email"
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit" className='email-button'>
                  Send Code
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="input-confirm">
                <label htmlFor="code">Enter 6-digit Code</label>
                <input 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"  
                  className="code"
                  maxLength={6}
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit" className='code-button'>
                  Confirm Code
                </button>
              </div>  
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;