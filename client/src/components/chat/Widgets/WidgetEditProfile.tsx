import { editUserProfileDetails, getUserProfileDetails } from "@/api/user";
import { useNotification } from "@/hooks/chat/useNotification";
import type { ProfileDetailsProps, WidgetFindServer } from "@/types";
import { useEffect, useState, type FormEvent } from "react";

const WidgetEditProfile = ({ onClose }: WidgetFindServer) => {
  const [userDetails, setUserDetails] = useState<ProfileDetailsProps | null>(null);
  const { addNotification } = useNotification();

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {      
      if (!userDetails) {
        return;
      }
      const data = await editUserProfileDetails(userDetails);
      if (!data?.success) {
        addNotification('error', data?.message || 'Ошибка создания');
        return;
      }
      addNotification('success', data.message);
      onClose();
    } catch (error) {
      addNotification('error', error as string);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await getUserProfileDetails();
      if (!response.success) {
        console.error(response.message);
        setUserDetails(null); 
        return;
      }
      setUserDetails(response.profile);
    }

    fetchUserProfile();
  }, []) 

  return (
    <div className="p-8 flex flex-col bg-[#353536]/90 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] w-full gap-5">
      <div className="relative w-full flex items-center justify-center">
        <h3 className="text-[#a3a2a3] font-semibold text-lg uppercase tracking-wide">Редактировать профиль</h3>
        <button onClick={onClose} className="absolute right-0 text-[#a3a2a3] hover:text-white transition-colors font-bold text-xl">✕</button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-1.5">
          <label className="text-[#a3a2a3] text-sm">GitHub</label>
          <input value={userDetails?.github_href} onChange={e => setUserDetails({ ...userDetails, github_href: e.target.value})}
            className="bg-[#292929] rounded-xl text-[16px] p-3 text-[#a3a2a3] focus:outline-none"
            placeholder="https://github.com/..."
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[#a3a2a3] text-sm">Telegram</label>
          <input value={userDetails?.telegram_href} onChange={e => setUserDetails({ ...userDetails, telegram_href: e.target.value})}
            className="bg-[#292929] rounded-xl text-[16px] p-3 text-[#a3a2a3] focus:outline-none"
            placeholder="@username"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[#a3a2a3] text-sm">Обо мне</label>
          <textarea value={userDetails?.about_me} onChange={e => setUserDetails({ ...userDetails, about_me: e.target.value})}
            className="bg-[#292929] rounded-xl text-[16px] p-3 text-[#a3a2a3] focus:outline-none resize-none h-24"
            placeholder="Расскажи о себе..."
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[#a3a2a3] text-sm">Статус</label>
          <input value={userDetails?.status} onChange={e => setUserDetails({ ...userDetails, status: e.target.value})}
            className="bg-[#292929] rounded-xl text-[16px] p-3 text-[#a3a2a3] focus:outline-none"
            placeholder="Занят / В сети / Не беспокоить"
          />
        </div>
        <button className="bg-[#616366] p-3.5 w-full rounded-xl text-white transition-all duration-300 font-bold hover:bg-[#616366]/50 active:scale-95">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default WidgetEditProfile;