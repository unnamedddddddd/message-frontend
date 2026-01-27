import type ChatProps from "../interfaces/ChatProps";

const Chat = ({image, name} : ChatProps) => {

  return(
    <>
      <div className={`container-chat-${name}`}>
          <img src={image} alt="test" className='chat-image'/>
          <div className='chat-text'> 
            <div className='chat-name'>test</div>
            <div className='chat-users'>
              <ul className='chat-users-name'></ul>
            </div>
          </div>
      </div>
    </>
  );
}

export default Chat;