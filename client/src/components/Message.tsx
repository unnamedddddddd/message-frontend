import type MessageProps from "../interfaces/MessageProps";


//ДОБАВИТЬ ВРЕМЯ
const Message = ({message, userName, type, time}: MessageProps) => {
  const messageTime = () => {
    if (type === 'my') {
      return(
        <>
          <div className="message-time">
            {time}
          </div> 
          <div className={`message-text-${type}`}>
            <span>
              {message}
            </span>
          </div>
        </>
      );
    } else {
      return(
        <>
          <div className={`message-text-${type}`}>
            <span>
              {message}
            </span>
          </div>
          <div className="message-time">
            {time}
          </div> 
        </>
      );
    }
  }

  return (
    <div className="message-container">
      <div className={`user-name-${type}`}>
        {userName}
      </div>
      <div className="message-data">
        {messageTime()}
      </div>
    </div>
  )
}

export default Message;