import type { FriendProps } from "@/types";
import { SERVER_URL } from "../../config";

const Friend = ({id, friendId, avatar, name, online, disabled, onJoinChat }: FriendProps) => {
  const handleJoin = () => {
    if (onJoinChat) {
      onJoinChat('personal', id, friendId);
    }
  };
    
  return (
  <button 
    disabled={disabled}
    onClick={handleJoin}
    className="group mb-5 flex items-center w-fit p-2 bg-[#353536]/70 border border-[#6d7275]/40 rounded-xl transition-all duration-200 
              hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
              disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-[0.5]"
    title={name}
  >
    <div className="relative">
      <img 
        src={`${SERVER_URL}${avatar}`} 
        alt={name}
        className="w-12 h-12 rounded-[15px] border border-[#6d7275]/30 object-cover" 
      />
      <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-[#353536] ${
        online === true ? 'bg-green-500' : 
        // online === 'idle' ? 'bg-yellow-500' : 
        'bg-gray-500'
      }`} />
    </div>
    <div className="flex flex-col items-start px-3">
      <span className="text-white font-medium text-sm leading-tight">
        {name}
      </span>
    </div>
  </button>
);
};

export default Friend;
