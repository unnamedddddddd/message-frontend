import type ProfileProps from '../interfaces/user/ProfileProps';

const Profile = ({name, avatar, logOut} : ProfileProps) => {
  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-image">
          <img src={avatar} alt="test" className='profile-avatar'/>
        </div>
        <div className="profile-text">
          <span className='profile-name'>
            {name}
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