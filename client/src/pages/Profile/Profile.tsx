import Email from "@/components/user/Email";
import { SERVER_URL } from "../../config";
import { useAuth } from "@/hooks/user";
import { getUserProfileDetails } from "@/api/user";
import { useCallback, useEffect, useState } from "react";
import type { ProfileDetailsProps } from "@/types";
import { WidgetEditProfile } from "@/components/chat/Widgets";

const ProfileForm = () => {
  const {
    userLogin,
    userAvatar,
    changeUserAvatar
  } = useAuth();
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
  }, [])

  useEffect(() => {
    // eslint-disable-next-line
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleCloseWidgetEditProfile = () => {
    fetchUserProfile();
    setShowWidgetEditProfile(false)
  }

  return (
    <div className="h-full flex items-center justify-center p-8 relative overflow-hidden bg-[#111214]">
      <div className="blue-circle-left absolute top-10 left-10 w-64 h-64 rounded-full bg-[#5865f2]/10 blur-3xl" />
      <div className="blue-circle-center absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#5865f2]/5 blur-3xl" />
      <div className="red-circle-right absolute bottom-3/4 right-1/4 w-52 h-52 rounded-full bg-[#cb9cf1]/15 blur-3xl" />
      <div className="pink-circle-bottom absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-[#5865f2]/5 blur-3xl" />

      <div className="w-full max-w-2xl bg-[#2b2d31] rounded-2xl overflow-hidden relative z-10">

        <div className="h-24 bg-[#616366]" />

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="relative group">
              <label htmlFor="user-avatar-upload" className="cursor-pointer">
                <img
                  src={`${SERVER_URL}${userAvatar}`}
                  alt={userLogin}
                  className="h-24 w-24 rounded-full border-4 border-[#2b2d31] object-cover group-hover:brightness-75 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs">
                  Сменить
                </div>
              </label>
              <input id="user-avatar-upload" type="file" accept="image/*" className="hidden" onChange={changeUserAvatar} />
            </div>
          </div>

          <div className="text-xl font-bold text-white mb-4">{userLogin}</div>

          <div className="w-full h-[1px] bg-[#1e1f22] mb-4" />

          <div className="flex flex-col gap-3">
            <Email />
            <div className="bg-[#1e1f22] rounded-xl p-3 text-sm flex justify-between">
              <span className="text-[#6c6e70] text-md">
                GitHub:
                <span className="text-[#e0e4e8] ml-1">{userDetails?.github_href || '...'}</span>
              </span>
              <button onClick={() => setShowWidgetEditProfile(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-[#a3a2a3] hover:text-white transition-colors"
                >
                  <path d="M21.707,5.565,18.435,2.293a1,1,0,0,0-1.414,0L3.93,15.384a.991.991,0,0,0-.242.39l-1.636,4.91A1,1,0,0,0,3,22a.987.987,0,0,0,.316-.052l4.91-1.636a.991.991,0,0,0,.39-.242L21.707,6.979A1,1,0,0,0,21.707,5.565ZM7.369,18.489l-2.788.93.93-2.788,8.943-8.944,1.859,1.859ZM17.728,8.132l-1.86-1.86,1.86-1.858,1.858,1.858Z" />
                </svg>
              </button>
            </div>

            <div className="bg-[#1e1f22] rounded-xl p-3 text-sm flex justify-between">
              <span className="text-[#6c6e70] text-md">
                Telegram:
                <span className="text-[#e0e4e8] ml-1">{userDetails?.telegram_href || '...'}</span>
              </span>
              <button onClick={() => setShowWidgetEditProfile(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-[#a3a2a3] hover:text-white transition-colors"
                >
                  <path d="M21.707,5.565,18.435,2.293a1,1,0,0,0-1.414,0L3.93,15.384a.991.991,0,0,0-.242.39l-1.636,4.91A1,1,0,0,0,3,22a.987.987,0,0,0,.316-.052l4.91-1.636a.991.991,0,0,0,.39-.242L21.707,6.979A1,1,0,0,0,21.707,5.565ZM7.369,18.489l-2.788.93.93-2.788,8.943-8.944,1.859,1.859ZM17.728,8.132l-1.86-1.86,1.86-1.858,1.858,1.858Z" />
                </svg>
              </button>
            </div>

            <div className="bg-[#1e1f22] rounded-xl p-3 text-sm flex justify-between">
              <span className="text-[#6c6e70] text-md">
                Статус:
                <span className="text-[#e0e4e8] ml-1">{userDetails?.status || '...'}</span>
              </span>
              <button onClick={() => setShowWidgetEditProfile(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-[#a3a2a3] hover:text-white transition-colors"
                >
                  <path d="M21.707,5.565,18.435,2.293a1,1,0,0,0-1.414,0L3.93,15.384a.991.991,0,0,0-.242.39l-1.636,4.91A1,1,0,0,0,3,22a.987.987,0,0,0,.316-.052l4.91-1.636a.991.991,0,0,0,.39-.242L21.707,6.979A1,1,0,0,0,21.707,5.565ZM7.369,18.489l-2.788.93.93-2.788,8.943-8.944,1.859,1.859ZM17.728,8.132l-1.86-1.86,1.86-1.858,1.858,1.858Z" />
                </svg>
              </button>
            </div>

            <div className="bg-[#1e1f22] rounded-xl p-3 text-sm flex justify-between">
              <span className="text-[#6c6e70] text-md">
                Обо мне:
                <span className="text-[#e0e4e8] ml-1">{userDetails?.about_me || '...'}</span>
              </span>
              <button onClick={() => setShowWidgetEditProfile(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="text-[#a3a2a3] hover:text-white transition-colors"
                >
                  <path d="M21.707,5.565,18.435,2.293a1,1,0,0,0-1.414,0L3.93,15.384a.991.991,0,0,0-.242.39l-1.636,4.91A1,1,0,0,0,3,22a.987.987,0,0,0,.316-.052l4.91-1.636a.991.991,0,0,0,.39-.242L21.707,6.979A1,1,0,0,0,21.707,5.565ZM7.369,18.489l-2.788.93.93-2.788,8.943-8.944,1.859,1.859ZM17.728,8.132l-1.86-1.86,1.86-1.858,1.858,1.858Z" />
                </svg>
              </button>
            </div>
            <div className={`widget-overlay ${showWidgetEditProfile ? 'visible' : ''}`} onClick={() => setShowWidgetEditProfile(false)}>
              <div className="widget-window-edit-profile" onClick={e => e.stopPropagation()}>
                <WidgetEditProfile onClose={handleCloseWidgetEditProfile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
