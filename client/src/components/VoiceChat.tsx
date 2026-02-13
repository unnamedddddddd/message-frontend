import type { VoiceChatProps } from "@/types";

const VoiceChat = ({ chatId, disabled, name, onJoinChat }: VoiceChatProps) => {
  const handleButton = () => {
    if (onJoinChat) {
      onJoinChat(chatId.toString());
    }
  }


  return (
     <>
      <button 
        className="button-chat" 
        disabled={disabled}
        onClick={handleButton}
      >
        <div className={`container-chat`}>
            <div className='chat-text'> 
              <div className='chat-name'>{name}</div>
            </div>
            <div className="chat-users">
              <ul className="users-list">
                
              </ul>
            </div>
        </div>
      </button>
    </>
  );
};


export default VoiceChat