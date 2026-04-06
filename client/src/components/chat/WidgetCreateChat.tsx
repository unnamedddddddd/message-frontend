import { createChat } from "@/api/chat";
import { useNotification } from "@/hooks/chat/useNotification";
import type { CreateChatProps } from "@/types";
import { useState, type FormEvent } from "react";

const WidgetCreateChat = ({ onClose, serverId }: CreateChatProps) => {
  const [chatType, setChatType] = useState<'text' | 'voice'>('text');
  const [chatName, setChatName] = useState<string>('');
  const { addNotification } = useNotification();

  const handleCreateChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!serverId) {
        addNotification('info', 'Зайдите на сервер');
        return;
      }
      const data = await createChat(serverId, chatName, chatType);
      if (!data?.success) {
        addNotification('error', data?.message || 'Ошибка создания');
        return;
      }
      addNotification('success', data.message);
      setChatName('');
      onClose(); 
    } catch (error) {
      addNotification('error', 'Произошла ошибка');
      console.error(error);
    }
  };

  const radioInputClass = "appearance-none w-[18px] h-[18px] border-2 border-[#a3a2a3] rounded-full cursor-pointer transition-all duration-200 checked:bg-[#1314148a] checked:border-[#0d0d0e8a] checked:shadow-[inset_0_0_0_3px_#292929]";

  return (
    <div className="p-8 flex flex-col bg-[#353536]/90 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] max-w-[400px] w-full gap-5">
      <div className="relative w-full flex items-center justify-center">
        <h3 className="text-[#a3a2a3] font-semibold text-lg uppercase tracking-wide">Создать чат</h3>
        <button 
          onClick={onClose} 
          className="absolute right-0 text-[#a3a2a3] hover:text-white transition-colors font-bold text-xl"
        >
          ✕
        </button>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleCreateChat}>
        <div className="flex flex-col gap-1.5">
          <label className="pl-1 mb-[3px] text-[#a3a2a3] text-sm">Имя чата</label>
          <input
            value={chatName}
            className="bg-[#292929] border-none rounded-[12px] text-[16px] p-[14px_16px] transition-all duration-500 shadow-[inset_#1717188a_2px_2px_12px] text-[#a3a2a3] placeholder:opacity-60 focus:outline-none focus:shadow-[inset_#504f4f8a_2px_2px_12px]"
            type="text" 
            placeholder="Название чата..."
            onChange={(e) => setChatName(e.target.value)}
            minLength={5}
            required
          />
        </div>

        <div className="flex justify-around py-2 border-y border-[#4e4f51]/20 gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-[#a3a2a3] group">
            <input
              type="radio"
              className={radioInputClass}
              checked={chatType === 'voice'}
              onChange={() => setChatType('voice')}
            />
            <span className="group-hover:text-white transition-colors">Голосовой</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer text-[#a3a2a3] group">
            <input
              type="radio"
              className={radioInputClass}
              checked={chatType === 'text'}
              onChange={() => setChatType('text')}
            />
            <span className="group-hover:text-white transition-colors">Текстовый</span>
          </label>
        </div>

        <button className="bg-[#292929] border-none p-3.5 w-full rounded-xl text-[#a3a2a3] transition-all duration-300 text-base font-bold hover:bg-[#434548] active:scale-95">
          Create chat
        </button>
      </form>
    </div>
  );
};

export default WidgetCreateChat;
