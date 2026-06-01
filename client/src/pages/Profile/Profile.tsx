import Email from "@/components/user/Email";
import { useAuth } from "@/hooks/user";
import { useCallback, useEffect, useState } from "react";
import type { ProfileDetailsProps } from "@/types";
import { WidgetEditProfile } from "@/components/chat/Widgets";
import { createPortal } from "react-dom";
import { getUserProfileDetails } from "@/api/user/get";

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-white/30 hover:text-white/80 transition-colors">
    <path d="M21.707,5.565,18.435,2.293a1,1,0,0,0-1.414,0L3.93,15.384a.991.991,0,0,0-.242.39l-1.636,4.91A1,1,0,0,0,3,22a.987.987,0,0,0,.316-.052l4.91-1.636a.991.991,0,0,0,.39-.242L21.707,6.979A1,1,0,0,0,21.707,5.565ZM7.369,18.489l-2.788.93.93-2.788,8.943-8.944,1.859,1.859ZM17.728,8.132l-1.86-1.86,1.86-1.858,1.858,1.858Z" />
  </svg>
);

const ProfileForm = () => {
  const { userLogin, userAvatar, changeUserAvatar } = useAuth();
  const [userDetails, setUserDetails] = useState<ProfileDetailsProps | null>(null);
  const [showWidgetEditProfile, setShowWidgetEditProfile] = useState<boolean>(false);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await getUserProfileDetails();
      if (!response.success) return;
      setUserDetails(response.profile);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleCloseWidgetEditProfile = () => {
    fetchUserProfile();
    setShowWidgetEditProfile(false);
  };

  const detailRow = (label: string, value: string | undefined) => (
    <div className="bg-black/40 border border-white/[0.05] rounded-xl p-3 flex justify-between items-center group">
      <span className="text-white/30 text-sm">
        {label}
        <span className="text-[#a3a2a3] ml-2">{value || '—'}</span>
      </span>
      <button onClick={() => setShowWidgetEditProfile(true)} className="opacity-0 group-hover:opacity-100 transition-opacity">
        <EditIcon />
      </button>
    </div>
  );

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="absolute pink-circle-bottom bg-[#ff99c9] w-[15vw] h-[15vw] rounded-full top-[10%] left-[70%] blur-3xl" />
      <div className="absolute purple-circle-right bg-[#c1bddb] w-[12vw] h-[12vw] rounded-full right-[65%] top-[15%] blur-3xl" />
      <div className="absolute blue-circle-right bg-[#a2c7e5] w-[10vw] h-[10vw] rounded-full left-[80%] bottom-[20%] blur-3xl" />
      <div className="absolute aqua-circle-left-animate bg-[#58fcec] w-[12vw] h-[12vw] rounded-full right-[70%] bottom-[10%] blur-3xl" />

      <div className="w-full max-w-2xl  bg-transparent backdrop-blur-xl border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
        <div className="h-24 bg-white/[0.04] border-b border-white/[0.05]" />

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="relative group">
              <label htmlFor="user-avatar-upload" className="cursor-pointer">
                <img
                  src={userAvatar}
                  alt={userLogin}
                  className="h-24 w-24 rounded-full border-4 border-[#0d0d0f] object-cover group-hover:brightness-75 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white/80 text-xs font-medium">
                  Сменить
                </div>
              </label>
              <input id="user-avatar-upload" type="file" accept="image/*" className="hidden" onChange={changeUserAvatar} />
            </div>
          </div>

          <div className="text-xl font-bold text-white mb-1 tracking-tight">{userLogin}</div>
          <div className="text-xs text-white/25 uppercase tracking-widest mb-4">Участник</div>

          <div className="w-full h-px bg-white/[0.06] mb-4" />

          <div className="flex flex-col gap-2">
            <Email />
            {detailRow('GitHub', userDetails?.github_href)}
            {detailRow('Telegram', userDetails?.telegram_href)}
            {detailRow('Статус', userDetails?.status)}
            {detailRow('Обо мне', userDetails?.about_me)}

            {createPortal(<div className={`widget-overlay ${showWidgetEditProfile ? 'visible' : ''}`} onClick={() => setShowWidgetEditProfile(false)}>
              <div className="widget-window-edit-profile" onClick={e => e.stopPropagation()}>
                <WidgetEditProfile onClose={handleCloseWidgetEditProfile} />
              </div>
            </div>,
              document.body)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
