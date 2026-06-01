import type { ServerProps } from "@/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useWebSocket } from "@/hooks/chat";

const Server = ({ serverId, avatar, name, disabled }: ServerProps) => {
  const navigate = useNavigate();
  const locationUser = useLocation();
  const { setCurrentServerId } = useWebSocket();

  const handleJoin = () => {
    if (locationUser.pathname === '/personalMessages' || locationUser.pathname === '/profile') {
      navigate('/home');
    }   
   setCurrentServerId(serverId)
  };
    console.log(avatar);
    
  return (
    <button 
      disabled={disabled}
      onClick={handleJoin}
      className="group w-fit p-2 rounded-xl transition-all duration-200 
              hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
                disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-[0.5]"
      title={name}
    >
      <div className="flex items-center"> 
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-[15px] border border-[#6d7275]/30 object-cover" 
        />
      </div>
    </button>
  )
};

export default Server;
