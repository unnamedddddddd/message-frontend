import type MessageProps from "../interfaces/MessageProps";

//ДОБАВИТЬ ВРЕМЯ
const Message = ({message, userName, type, renderTime}: MessageProps) => {

  return (
    <div className="message-container">
      <div className={`user-name-${type}`}>
        {userName}
      </div>
      <div className={`message-text-${type}`}>
        <span>
          {message}
        </span>
      </div>
      <div className={`message-time-${type}`}>
        {renderTime}
      </div> 
    </div>
  )
}

export default Message;