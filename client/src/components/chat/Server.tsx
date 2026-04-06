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
      className="group w-full mb-5 p-2 bg-[#353536]/70 border border-[#6d7275]/40 rounded-xl transition-all duration-200 
                 hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
                 disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-[0.5]"
    >
      <div className="flex items-center gap-5"> 
  
        <img 
          src={`${SERVER_URL}${avatar}`} 
          alt={name} 
          className="w-1/5 aspect-square rounded-[15px] border border-[#6d7275]/30 object-cover"
        />
        
        <div className="flex flex-col text-left"> 
          <span className="text-[20px] text-[#a3a2a3] group-hover:text-white transition-colors">
            {name}
          </span>
        </div>
      </div>
    </button>
  );
};

export default Server;
