import type { ServerProps } from "@/types";
import { SERVER_URL } from "../../config";
import { sendInvite } from "@/api/chat";
import { useState } from "react";
import { useNotification } from "@/hooks/chat/useNotification";

const FindedServer = ({ serverId, avatar, name }: ServerProps) => {
  const { addNotification } = useNotification();

  const [status, setStatus] = useState<boolean>(false);  
  const handleInviteServer = async () => {
    const response = await sendInvite(serverId);
    if (!response.success) {
      console.error(response.message);
      addNotification('error', response.message);
      return;
    }
    setStatus(true);
     addNotification('success', 'Приглашение отправлено, ожидайте ответа админа');
  }

  return (
    <button 
      className="group mb-5 w-fit p-2 bg-[#353536]/70 border border-[#6d7275]/40 rounded-xl transition-all duration-200 
              hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
                disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-[0.5]"
      title={name}
      onClick={handleInviteServer}
      disabled={status}
    >
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
    </button>
  )
};

export default FindedServer;
