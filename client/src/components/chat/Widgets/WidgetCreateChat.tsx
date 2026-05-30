import { createChat } from "@/api/chat/create";
import { useNotification } from "@/hooks/chat";
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

  const radioInputClass = "appearance-none w-[18px] h-[18px] border-2 border-white/20 rounded-full cursor-pointer transition-all duration-200 checked:bg-white/10 checked:border-white/40 checked:shadow-[inset_0_0_0_3px_rgba(0,0,0,0.6)]";

  return (
    <div className=" p-8 flex flex-col bg-[#0d0d0f]/90 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.6)] max-w-[400px] w-full gap-5">
      <div className="relative w-full flex items-center justify-center">
        <h3 className="text-white/60 font-semibold text-sm uppercase tracking-widest">Создать чат</h3>
        <button onClick={onClose} className="absolute right-0 text-white/30 hover:text-white transition-colors text-xl leading-none">✕</button>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleCreateChat}>
        <div className="flex flex-col gap-1.5">
          <label className="text-white/40 text-xs uppercase tracking-widest pl-1">Имя чата</label>
          <input
            value={chatName}
            className="bg-black/60 border border-white/[0.08] rounded-xl text-[16px] p-[14px_16px] text-[#a3a2a3] placeholder:text-[#a3a2a3]/40 focus:outline-none focus:border-white/20 transition-colors"
            type="text"
            placeholder="Название чата..."
            onChange={(e) => setChatName(e.target.value)}
            minLength={5}
            required
          />
        </div>

        <div className="flex justify-around py-3 border-y border-white/[0.06] gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-[#a3a2a3] group">
            <input type="radio" className={radioInputClass} checked={chatType === 'voice'} onChange={() => setChatType('voice')} />
            <span className="group-hover:text-white transition-colors text-sm">Голосовой</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-[#a3a2a3] group">
            <input type="radio" className={radioInputClass} checked={chatType === 'text'} onChange={() => setChatType('text')} />
            <span className="group-hover:text-white transition-colors text-sm">Текстовый</span>
          </label>
        </div>

        <button className="bg-white/[0.08] border border-white/[0.1] p-3.5 w-full rounded-xl text-[#a3a2a3] transition-all font-semibold hover:bg-white/[0.14] hover:text-white active:scale-95">
          Create chat
        </button>
      </form>
    </div>
  );
};

export default WidgetCreateChat;
