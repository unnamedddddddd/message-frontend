import { useNotification } from "@/hooks/chat/useNotification";
import type { FindUserProps } from "@/types";
import { useState } from "react";
import { SERVER_URL } from "../../config";
import { sendRequestFriend } from "@/api/chat";

const FoundUser = ({ userAvatar, userId, userLogin }: FindUserProps) => {
  const { addNotification } = useNotification();
  const [status, setStatus] = useState<boolean>(false);  

  const handleRequestFriend = async () => {
    const response = await sendRequestFriend(userId);
    if (!response.success) {
      console.error(response.message);
      addNotification('error', response.message);
      return;
    }
    setStatus(true);
    addNotification('success', 'Запрос в друзья отправлен');
  }

  return (
    <div className="flex items-center p-2 border rounded-2xl border-[#6d7275]/40 justify-between">
        <div className="flex items-center gap-2"> 
          <img 
            src={`${SERVER_URL}${userAvatar}`} 
            alt={userLogin} 
            className="w-12 h-12 rounded-[15px] border border-[#6d7275]/30 object-cover" 
          />
          <div className="">
            <span>{userLogin}</span>
          </div>
        </div>
        <button 
        className="w-fit p-2 bg-[#353536]/70 border border-[#6d7275]/40 rounded-xl transition-all duration-200 
                hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-[0.5]"
        title={`Отправить запрос в друзья пользователю ${userLogin}`}
        onClick={handleRequestFriend}
        disabled={status}
      >
        Отправить запрос в друзья?
      </button>
    </div>
  )
};

export default FoundUser;
