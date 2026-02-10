import type ChatProps from "../types/chat/TextChatProps";

const TextChat = ({chatId, name, disabled, onJoinChat}: ChatProps) => {
  const handleJoin = () => {
    if (onJoinChat) {
      onJoinChat(name, chatId);
    }
  }

  return (
     <>
      <button 
        className="button-chat" 
        disabled={disabled}
        onClick={handleJoin}
      >
        <div className={`container-chat`}>
            <div className='chat-text'> 
              <div className='chat-name'>{name}</div>
            </div>
            <div className="chat-users">

            </div>
        </div>
      </button>
    </>
  );
};

export default TextChat;