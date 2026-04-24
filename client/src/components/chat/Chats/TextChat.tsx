import type { TextChatProps } from "@/types";

const TextChat = ({ chatId, name, disabled, onJoinChat }: TextChatProps) => {
  const handleJoin = () => {
    if (onJoinChat) {
      onJoinChat('server', chatId);
    }
  };
  
  return (
    <button 
      disabled={disabled}
      onClick={handleJoin}
      className="group w-full mb-5 p-2 bg-[#353536]/70 border border-[#6d7275]/40 rounded-xl transition-all duration-200 
                 hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
                 disabled:opacity-60 disabled:cursor-not-allowed disabled:filter disabled:grayscale-[0.5]"
    >
      <div className="flex items-center justify-between px-2"> 
        <div className="flex flex-col text-left"> 
          <span className="text-[18px] text-[#a3a2a3] group-hover:text-white transition-colors">
            # {name}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
        </div>
      </div>
    </button>
  );
};

export default TextChat;
