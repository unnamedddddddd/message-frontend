import type { ServerProps } from "@/types";
import { SERVER_URL } from "../../config";

const Server = ({ serverId, avatar, name, disabled, onJoinServer }: ServerProps) => {
  const handleJoin = () => {
    if (onJoinServer) {
      onJoinServer(serverId);
    }
  };
  
  return (
    <button 
      disabled={disabled}
      onClick={handleJoin}
      className="group mb-5 w-fit p-2 bg-[#353536]/70 border border-[#6d7275]/40 rounded-xl transition-all duration-200 
              hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
                disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-[0.5]"
      title={name}
    >
      <div className="flex items-center"> 
        <img 
          src={`${SERVER_URL}${avatar}`} 
          alt={name} 
          className="w-12 h-12 rounded-[15px] border border-[#6d7275]/30 object-cover" 
        />
      </div>
    </button>
  )
};

export default Server;
