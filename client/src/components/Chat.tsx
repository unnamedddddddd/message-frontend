import type ChatProps from "../interfaces/ChatProps";

const Chat = ({name, disabled, onJoinChat}: ChatProps) => {
  const handleJoin = () => {
    if (onJoinChat) {
      onJoinChat(name);
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

export default Chat;