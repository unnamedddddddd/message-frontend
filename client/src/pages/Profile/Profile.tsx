import Email from "@/components/user/Email";
import { SERVER_URL } from "../../config";
import { useAuth } from "@/hooks/user";
import { Link } from 'react-router-dom';

const ProfileForm = () => {
  const {
    userLogin,
    userAvatar,
    changeUserAvatar
  } = useAuth();
  
  return (
    <div className="p-5"> 
      <div className="portal-breadcrums customzed"></div>
      
      <div className="mx-auto flex w-full max-w-[600px] flex-col rounded-xl bg-[#2f3136]/90 p-[30px] shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
        <Link 
          to='/home'
          className="block text-right text-[14px] text-[#5c5e61] no-underline hover:text-[#a3a2a3] transition-colors"
        >
          Назад
        </Link>

        <div className="flex items-center gap-[25px]"> 
          <div className="relative group">
            <label htmlFor="user-avatar-upload" className="cursor-pointer block relative">
              <img 
                src={`${SERVER_URL}${userAvatar}`} 
                alt={`Аватар пользователя ${userLogin}`} 
                className="h-[120px] w-[120px] rounded-full border-3 border-white/10 object-cover transition-all duration-300 group-hover:brightness-[0.7]"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white text-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Сменить фото
              </div>
            </label>
            
            <input 
              id="user-avatar-upload"
              type="file"  
              accept="image/*" 
              className="hidden" 
              onChange={changeUserAvatar} 
            />
          </div>

          <div className="text-[20px] font-semibold text-white"> 
            {userLogin}
          </div>
        </div>

        <div className="mt-8"> 
          <div className="flex items-center justify-start gap-[10px]"> 
            <Email/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
