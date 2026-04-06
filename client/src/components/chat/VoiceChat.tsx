import type { VoiceChatProps } from "@/types";

const VoiceChat = ({ chatId, disabled, name, onJoinChat }: VoiceChatProps) => {
  const handleButton = () => {
    if (onJoinChat) {
      onJoinChat(chatId.toString());
    }
  }

  return (
    <button 
      disabled={disabled}
      onClick={handleButton}
      className="group w-full mb-5 p-2 bg-[#353536]/70 border border-[#6d7275]/40 rounded-xl transition-all duration-200 
                 hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
                 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <div className="flex flex-col px-2">
        <div className="flex items-center gap-2">
          <span className="text-[#a3a2a3] group-hover:text-white transition-colors">
            🔊
          </span>
          <div className="text-[18px] text-[#a3a2a3] group-hover:text-white transition-colors">
            {name}
          </div>
        </div>

        <div className="mt-2 pl-6"> 
          <ul className="flex flex-col gap-1 text-sm text-[#a3a2a3]/80">
          </ul>
        </div>
      </div>
    </button>
  );
};

export default VoiceChat;
