import { useAuth } from "@/hooks/user";
import { Link } from 'react-router-dom';

const Email = () => {
  const { userEmail } = useAuth();
  const verifyEmail =  () => {
    if (userEmail) {
      return (
        <>
          email: {userEmail}
        </>
      );
    } else {
      return (
        <>
        <div className="verify-email">
          <label htmlFor="">
            email: 
          </label> 
          <Link
          to='/verifyEmail'
          style={{
            display: 'block',
            textAlign: 'right',
            color: '#5c5e61',
            fontSize: '14px',
            textDecoration: 'none',
            justifyContent: 'flex-end'
          }}
          >
          не потвержден
          </Link>
        </div>
        </>
      )
    }
  }


  return (
    <div className="user-email-container">
      {verifyEmail()}
    </div>
  );
};



export default Email;