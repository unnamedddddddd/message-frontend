import { useEffect, useState } from "react";
import getUserProfile from "../../api/user/getUserProfile";
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from "../../config";
import './Profile.css'

const Profile = () => {
  const [userLogin, setUserLogin] = useState<string>('') ;
  const [userAvatar, setUserAvatar] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      const userId = localStorage.getItem('user_id');

      if (userId) {
        const data = await getUserProfile(Number(userId));
        
        if (!data.success) {
          console.log(data.message);
          navigate('/login');
          return;
        }
        setUserLogin(data.userLogin);
        setUserAvatar('') // ДОБАВИТЬ АВАТАРЫ ПОЛЬЗОВАТЕЛЕЙ
      } else {
        alert('id не найден');
        navigate('/login');
        return;
      }
    }

    loadUserProfile();
  }, [navigate]);

  return (
    <div className="profile-main">
      <div className="portal-breadcrums customzed">
      </div>
      <div className="card-info_full_info">
          <div className="card-header_full-name">
            <div className="card-header_user-avatar">
              <img src={`${SERVER_URL}${userAvatar}`} alt={`Аватар пользователя ${userLogin}`} className='profile-image'/> {/*ДОБАВИТЬ ДЕФОЛТ АВАТАР*/}
            </div>
            <div className="card-header_user-login">
              {userLogin}
            </div>
          </div>
          <div className="card-body_user_info">
            <div className="card-body_user-email">
              {/* ДОБАВИТЬ EMAIL*/}email: dlfkdfkbsdjkfsfds
            </div>
          </div>
        </div>
    </div>
  );
};

export default Profile;