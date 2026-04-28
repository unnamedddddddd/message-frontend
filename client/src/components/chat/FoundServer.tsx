import { sendInviteServer } from "@/api/chat";
import { useNotification } from "@/hooks/chat/useNotification";
import type { ServerProps } from "@/types";
import { useState } from "react";
import { SERVER_URL } from "../../config";

const FoundServer = ({ serverId, avatar, name }: ServerProps) => {
  const { addNotification } = useNotification();

  const [status, setStatus] = useState<boolean>(false);  
  const handleInviteServer = async () => {
    const response = await sendInviteServer(serverId);
    if (!response.success) {
      console.error(response.message);
      addNotification('error', response.message);
      return;
    }
    setStatus(true);
    addNotification('success', 'Приглашение отправлено, ожидайте ответа админа');
  }

  return (
    <div className="flex items-center p-2 border rounded-2xl border-[#6d7275]/40 justify-between">
        <div className="flex items-center gap-2"> 
          <img 
            src={`${SERVER_URL}${avatar}`} 
            alt={name} 
            className="w-12 h-12 rounded-[15px] border border-[#6d7275]/30 object-cover" 
          />
          <div className="">
            <span>{name}</span>
          </div>
        </div>
        <button 
        className="w-fit p-2 bg-[#353536]/70 border border-[#6d7275]/40 rounded-xl transition-all duration-200 
                hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-[0.5]"
        title={name}
        onClick={handleInviteServer}
        disabled={status}
      >
        Присоединится к серверу?
      </button>
    </div>
  )
};

export default FoundServer;
