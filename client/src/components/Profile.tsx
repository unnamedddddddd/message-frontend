import type ProfileProps from '../interfaces/ProfileProps';

const Profile = ({name, image} : ProfileProps) => {
  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-image">
          <img src={image} alt="test" className='profile-avatar'/>
        </div>
        <div className="profile-text">
          <span className='profile-name'>
            {name}
          </span>
        </div>
      </div>
      <div className="profile-data">

      </div>
    </div>
  );
};

export default Profile;