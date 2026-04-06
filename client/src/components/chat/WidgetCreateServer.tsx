import { createServer } from "@/api/chat";
import { useNotification } from "@/hooks/chat/useNotification";
import type { CreateServerProps } from "@/types";
import { useState } from "react";

const WidgetCreateServer = ({ onClose }: CreateServerProps) => {
  const [serverName, setServerName] = useState<string>('');
  const [serverAvatar, setServerAvatar] = useState<File | null>(null);
  const [serverAvatarURL, setServerAvatarURL] = useState<string>('');
  const { addNotification } = useNotification();

  const handleCreateServer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!serverAvatar) {
      addNotification('warning', 'Выберите аватар сервера');
      return;
    }

    const data = await createServer(serverName, serverAvatar);
    if (!data.success) {
      addNotification('error', data.message);
      return;
    }
    addNotification('success', data.message);
    window.location.reload();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      addNotification('warning', 'Файл слишком большой (макс 5МБ)');
      return;
    }

    setServerAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setServerAvatarURL(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const inputClass = "bg-[#292929] border-none rounded-[12px] text-[16px] p-[14px_16px] transition-all duration-500 shadow-[inset_#1717188a_2px_2px_12px] text-[#a3a2a3] placeholder:opacity-60 focus:outline-none focus:shadow-[inset_#504f4f8a_2px_2px_12px]";

  return (
    <div className="p-8 flex flex-col bg-[#353536]/90 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] max-w-[450px] w-full gap-6 min-w-[400px]">
      <div className="relative w-full flex items-center justify-center">
        <h3 className="text-[#a3a2a3] font-semibold text-lg uppercase tracking-wide">Создать сервер</h3>
        <button 
          onClick={onClose} 
          className="absolute right-0 text-[#a3a2a3] hover:text-white transition-colors font-bold text-xl"
        >
          ✕
        </button>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleCreateServer}>
        <div className="flex flex-col items-center gap-4">
          <label 
            htmlFor="server-avatar-upload" 
            className="w-full h-32 border-2 border-dashed border-[#1717188a] rounded-xl flex items-center justify-center cursor-pointer hover:border-[#ced0d8] hover:bg-[#7289da]/10 transition-all group overflow-hidden"
          >
            {serverAvatarURL ? (
              <img src={serverAvatarURL} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#b9bbbe] group-hover:text-white">Поставить аватар</span>
            )}
          </label>
          <input 
            id="server-avatar-upload"
            onChange={handleFileChange}
            type="file"  
            className="hidden"
            accept="image/*"
            required
          />
          <input 
            type="text" 
            value={serverAvatar?.name || ''} 
            placeholder="Файл не выбран"
            className={`${inputClass} w-full text-xs py-2 opacity-50`}
            disabled
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="widget-server-name-input" className="pl-1 text-[#a3a2a3] text-sm">Server name</label>
          <input
            id="widget-server-name-input"
            value={serverName}
            className={inputClass}
            type="text" 
            placeholder="Название сервера..."
            onChange={(e) => setServerName(e.target.value)}
            minLength={3}
            maxLength={10}
            required
          />
        </div>

        <button className="bg-[#292929] border-none p-3.5 w-full rounded-xl text-[#a3a2a3] transition-all duration-300 text-base font-bold hover:bg-[#434548] active:scale-95 shadow-md">
          CREATE SERVER
        </button>
      </form>
    </div>
  );
};

export default WidgetCreateServer;
