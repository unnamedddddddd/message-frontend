import { getFindUsers } from "@/api/chat/get/getFind";
import type { FindUserProps } from "@/types";
import type WidgetFindServerProps from "@/types/chat/WidgetFindServerProps";
import { debounce } from "@/utils";
import { mapFindUsers } from "@/utils/map";
import { useRef, useState } from "react";
import { FoundUser } from "../Founds";

const WidgetFindUsers = ({ onClose }: WidgetFindServerProps) => {
  const [foundUsers, setFoundUsers] = useState<FindUserProps[]>([]);
  const [prevUsers, setPrevUsers] = useState<FindUserProps[]>([]);

  const handleFindServer = async (text: string) => {
    setPrevUsers(foundUsers);
    if (!text) {
      setFoundUsers([]);
      return;
    }
    const data = await getFindUsers(text);
    if (!data.success) {
      console.error(data.message);
      setFoundUsers([]);
      return;
    }
    setFoundUsers(mapFindUsers(data.users));
  };

  const debouncedGetFindServer = useRef(
    debounce((value: string) => { handleFindServer(value); }, 300),
  );

  return (
    <div className="p-6 flex flex-col bg-[#0d0d0f]/90 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.6)] max-w-[700px] gap-5">
      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Поиск пользователей..."
          className="flex-1 bg-black/60 border border-white/[0.08] rounded-xl p-3 text-[#a3a2a3] placeholder:text-[#a3a2a3]/40 focus:outline-none focus:border-white/20 transition-colors"
          onChange={(e) => debouncedGetFindServer.current(e.target.value)}
        />
        <button onClick={onClose} className="text-white/30 hover:text-white transition-colors font-bold text-xl leading-none flex-shrink-0">✕</button>
      </div>
      <div className="flex flex-col rounded-xl overflow-hidden gap-3">
        {foundUsers.map((user, index) => (
          <div
            key={user.userId}
            className={prevUsers.some(s => s.userId === user.userId) ? '' : 'animate-slideIn'}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <FoundUser userAvatar={user.userAvatar} userId={user.userId} userLogin={user.userLogin} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetFindUsers;
