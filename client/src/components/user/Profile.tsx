import { SERVER_URL } from '@/config';
import { useAuth } from '@/hooks/user';
import type { ProfileProps } from '@/types';
import { Link } from 'react-router-dom';

const Profile = ({ logOut }: ProfileProps) => {
  const {
    userLogin,
    userAvatar,
  } = useAuth();

  return (
    <div className="flex w-[12%] shrink-0 flex-col gap-5 rounded-[15px] border border-[#6b6c6e]/30 bg-[#414243]/90 p-4 min-h-0">
      <div className="flex flex-col items-center gap-[5px]">
        <div className="mt-[10px]"> 
          <Link to='/profile'>
            <img 
              src={`${SERVER_URL}${userAvatar}`} 
              alt="Avatar" 
              className="h-[120px] w-[120px] cursor-pointer rounded-full object-cover transition-all duration-300 hover:brightness-110"
            />
          </Link>
        </div>
        <div className="text-center text-[20px] text-[#a3a2a3]">
          <span className="profile-name">
            {userLogin}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-grow rounded-[15px] border border-[#616366]/30 bg-[#38393b]/70 p-2">
        <button 
          className="mt-auto ml-auto mb-2 mr-2 rounded-md border border-[#6d7275]/40 bg-[#5b5c5f]/90 px-3 py-1 text-[#a3a2a3] transition-colors hover:bg-[#414243]/90"
          onClick={logOut}
        >
          logOut
        </button>
      </div>
    </div>
  );
};

export default Profile;
