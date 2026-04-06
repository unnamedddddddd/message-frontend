import { useAuth } from "@/hooks/user";
import { Link } from 'react-router-dom';

const Email = () => {
  const { userEmail, isVerified } = useAuth();  

  return (
    <div className="text-[#a3a2a3] text-[16px]"> 
      {isVerified ? (
        <span>email: {userEmail}</span>
      ) : (
        <div className="flex items-center gap-2">
          <label>email:</label> 
          <Link
            to='/verifyEmail'
            className="block text-[#5c5e61] text-[14px] no-underline hover:text-[#a3a2a3] transition-colors"
          >
            не подтвержден
          </Link>
        </div>
      )}
    </div>
  );
};

export default Email;
