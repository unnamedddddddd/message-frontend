import { SERVER_URL } from '@/config';
import type ProfileProps from '../types/user/ProfileProps';
import { useAuth } from '@/hooks/user';
import { Link } from 'react-router-dom';

const Profile = ({logOut} : ProfileProps) => {
  const {
      userLogin,
      userAvatar,
    } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-image-container">
          <Link to='/profile'>
            <img src={`${SERVER_URL}${userAvatar}`} alt="test" className='profile-avatar'/>
          </Link>
        </div>
        <div className="profile-text">
          <span className='profile-name'>
            {userLogin}
          </span>
        </div>
      </div>
      <div className="profile-data">
        <button className='logout-button' onClick={logOut}>
          logOut
        </button>
      </div>
    </div>
  );
};

export default Profile;