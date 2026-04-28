import { getFindUsers } from "@/api/chat";
import type { FindUserProps  } from "@/types";
import type WidgetFindServerProps from "@/types/chat/WidgetFindServerProps";
import { debounce, mapFindUsers } from "@/utils";
import { useRef, useState } from "react";
import FoundUser from "../FoundUser";

const WidgetFindUsers = ({ onClose }: WidgetFindServerProps) => {
  const [foundUsers , setFoundUsers] = useState<FindUserProps[]>([]);
  const [prevUsers, setPrevUsers] = useState<FindUserProps[]>([]);

  const handleFindServer = async(text: string) => {
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
    console.log(data.users);
    
    setFoundUsers(mapFindUsers(data.users));
  } 

  const debouncedGetFindServer = useRef(
    debounce((value: string) => {
        handleFindServer(value);
    }, 300),
  );

  return (
    <div className="p-4 flex flex-col bg-[#353536]/90 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] max-w-[700px] gap-6">
      <div className="flex gap-5">
        <input 
        type="text" 
        placeholder="Поиск пользователей"
        className="w-full p-3 rounded-lg bg-[#2a2a2b] text-white outline-none"
        onChange={(e) => debouncedGetFindServer.current(e.target.value)}
        />
        <button   
          onClick={onClose} 
          className="text-[#a3a2a3] hover:text-white transition-colors font-bold text-xl"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-col mb-auto rounded-2xl">
        {foundUsers.map((user, index) => (
          <div 
            key={user.userId}
            className={prevUsers.some(s => s.userId === user.userId) ? '' : 'animate-slideIn'}
            style={{ animationDelay: `${index * 50}ms` }}   
          >
            <FoundUser
              userAvatar={user.userAvatar}
              userId={user.userId}
              userLogin={user.userLogin}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetFindUsers;
