import Email from "@/components/Email";
import { SERVER_URL } from "../../config";
import './Profile.css'
import { useAuth } from "@/hooks/user";
import { Link } from 'react-router-dom';

const ProfileForm = () => {
  const {
    userLogin,
    userAvatar,
    changeUserAvatar
  } = useAuth();
  
  return (
    <div className="profile-main">
      <div className="portal-breadcrums customzed">
      </div>
      <div className="card-info_full_info">
          <Link 
            to='/home'
            style={{
              display: 'block',
              textAlign: 'right',
              color: '#5c5e61',
              fontSize: '14px',
              textDecoration: 'none',
              justifyContent: 'flex-end'
            }}
          >Назад</Link>
          <div className="card-header_full-name">
            <div className="card-header_user-avatar">
              <img src={`${SERVER_URL}${userAvatar}`} alt={`Аватар пользователя ${userLogin}`} className='profile-image'/> 
            </div>
            <div className="card-header_user-login">
              {userLogin}
            </div>
          </div>
          <div className="avatar-upload-wrapper">
            <label htmlFor="user-avatar-upload" className="avatar-label">
              <div className="avatar-overlay">Сменить фото</div>
            </label>
            <input 
              id="user-avatar-upload"
              type="file"  
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={changeUserAvatar} 
            />
          </div>
          <div className="card-body_user_info">
            <div className="card-body_user-email">
              <Email/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProfileForm;