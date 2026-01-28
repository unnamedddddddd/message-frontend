import type ChatProps from "../interfaces/ChatProps";

const Chat = ({image, name, disabled, onClick} : ChatProps) => {
  return(
    <>
      <button 
        className="button-chat" 
        disabled={disabled}
        onClick={onClick}
      >
        <div className={`container-chat-${name}`}>
            <img src={image} alt="test" className='chat-image'/>
            <div className='chat-text'> 
              <div className='chat-name'>test</div>
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