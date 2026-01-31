import type ChatProps from "../interfaces/ChatProps";

const Chat = ({image, name, disabled, onJoinRoom} : ChatProps) => {
  const handleJoin = () => {
    if (onJoinRoom) {
      onJoinRoom(name)
    }
  }

  return(
    <>
      <button 
        className="button-chat" 
        disabled={disabled}
        onClick={handleJoin}
      >
        <div className={`container-chat`}>
            <img src={image} alt="test" className='chat-image'/>
            <div className='chat-text'> 
              <div className='chat-name'>{name}</div>
              <div className='chat-users'>
                <ul className='chat-users-name'></ul>
              </div>
            </div>
        </div>
      </button>
    </>
  );
}

export default Chat;