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
      if (!userDetails) return;
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
    };
    fetchUserProfile();
  }, []);

  const inputClass = "bg-black/60 border border-white/[0.08] rounded-xl text-[16px] p-3 text-[#a3a2a3] placeholder:text-[#a3a2a3]/40 focus:outline-none focus:border-white/20 transition-colors";
  const labelClass = "text-white/40 text-xs uppercase tracking-widest";

  return (
    <div className="p-8 flex flex-col bg-[#0d0d0f]/90 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.6)] w-full gap-5">
      <div className="relative w-full flex items-center justify-center">
        <h3 className="text-white/60 font-semibold text-sm uppercase tracking-widest">Редактировать профиль</h3>
        <button onClick={onClose} className="absolute right-0 text-white/30 hover:text-white transition-colors text-xl leading-none">✕</button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>GitHub</label>
          <input value={userDetails?.github_href} onChange={e => setUserDetails({ ...userDetails, github_href: e.target.value })}
            className={inputClass} placeholder="https://github.com/..." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Telegram</label>
          <input value={userDetails?.telegram_href} onChange={e => setUserDetails({ ...userDetails, telegram_href: e.target.value })}
            className={inputClass} placeholder="@username" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Обо мне</label>
          <textarea value={userDetails?.about_me} onChange={e => setUserDetails({ ...userDetails, about_me: e.target.value })}
            className={`${inputClass} resize-none h-24`} placeholder="Расскажи о себе..." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Статус</label>
          <input value={userDetails?.status} onChange={e => setUserDetails({ ...userDetails, status: e.target.value })}
            className={inputClass} placeholder="Занят / В сети / Не беспокоить" />
        </div>
        <button className="bg-white/[0.08] border border-white/[0.1] p-3.5 w-full rounded-xl text-[#a3a2a3] transition-all font-semibold hover:bg-white/[0.14] hover:text-white active:scale-95">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default WidgetEditProfile;
