import { SERVER_URL } from "@/config";
import type { MessageProps } from "@/types";

const Message = ({message, userName, userAvatar, type, renderTime}: MessageProps) => {
  const isMyMessage = type === 'my';
  
  return (
    <div className={`flex items-end gap-2 flex-row mb-1`}>
      <img 
        src={`${SERVER_URL}${userAvatar}`}
        alt={userName}
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
      <div className={`flex flex-col items-start`}>
        <span className={`text-xs mb-1 ${isMyMessage ? 'text-white' : 'text-[#a3a2a3]'}`}>
          {userName}
        </span>
        <div className={`px-3 py-2 rounded-2xl max-w-xs border ${isMyMessage ? 'bg-white/[0.1] border-white/[0.1]' : 'bg-black/50 border-white/[0.06]'}`}>
          <span className="text-white text-sm break-words">{message}</span>
        </div>
        <span className="text-[10px] text-[#a3a2a3] mt-1">{renderTime}</span>
      </div>
    </div>
  );
}

export default Message;
