import type { VoiceChatProps } from "@/types";

const VoiceChat = ({chatId, disabled, name, onJoinChat }: VoiceChatProps) => {

  return (
     <>
      <button 
        className="button-chat" 
        disabled={disabled}
        // onClick={handleJoin}
      >
        <div className={`container-chat`}>
            <div className='chat-text'> 
              <div className='chat-name'>{123}</div>
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