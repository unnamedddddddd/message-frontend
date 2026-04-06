import { SERVER_URL } from "@/config";
import type { MessageProps } from "@/types";

const Message = ({ message, userName, userAvatar, type, renderTime }: MessageProps) => {
  const isMy = type === 'my';

  return (
    <div className={`flex items-end gap-2.5 mb-3 max-w-[75%] ${isMy ? 'ml-auto flex-row' : 'mr-auto flex-row-reverse'}`}>
      
      <div className={`flex flex-col p-3 shadow-lg border-2 border-white/5 
        ${isMy 
          ? 'bg-gradient-to-br from-[#616366] to-[#676b6e] rounded-[18px_18px_4px_18px]' 
          : 'bg-gradient-to-br from-[#505255] to-[#5b5e61] rounded-[18px_18px_18px_4px]'
        }`}
      >
        <div className={`text-xs font-semibold mb-1 ${isMy ? 'text-aquamarine text-right' : 'text-[#fc3908]/70 text-left'}`}>
          {userName}
        </div>

        <div className={`text-white text-[15px] leading-relaxed break-words ${isMy ? 'text-right' : 'text-left'}`}>
          {message}
        </div>

        <div className={`text-[10px] mt-1 text-[#a3a2a3] ${isMy ? 'text-right' : 'text-left'}`}>
          {renderTime}
        </div>
      </div>

      <div className="shrink-0">
        <img 
          src={`${SERVER_URL}${userAvatar}`} 
          alt={`Аватар ${userName}`} 
          className="w-10 h-10 rounded-full object-cover border-2 border-white/10 hover:scale-105 transition-transform duration-300"
        />
      </div>
      
    </div>
  );
};

export default Message;
