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
    className="group mb-3 flex items-center w-full p-2 bg-black/30 border border-white/[0.05] rounded-xl transition-all duration-200
              hover:bg-white/[0.06] hover:border-white/[0.09] active:bg-white/[0.04]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale-[0.4]"
    title={name}
  >
    <div className="relative">
      <img 
        src={`${SERVER_URL}${avatar}`} 
        alt={name}
        className="w-12 h-12 rounded-[15px] border border-[#6d7275]/30 object-cover" 
      />
      <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-black/60 ${
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
