import { SERVER_URL } from "@/config";
import type MessageProps from "../types/chat/MessageProps";

const Message = ({message, userName, userAvatar, type, renderTime}: MessageProps) => {
  return (
    <>
      {type ===  'my' ? (
        <>
          <div className="message-main-container">
            <div className={`message-container-${type}`}>
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
          </div>
          <div className={`message-avatar-container`}>
            <img src={`${SERVER_URL}${userAvatar}`} alt={`Аватар пользователя ${userName}`}  className={`message-avatar-${type}`}/>
          </div>
        </>
      ) : (
        <>
          <div className={`message-avatar-container`}>
            <img src={`${SERVER_URL}${userAvatar}`} alt={`Аватар пользователя ${userName}`}  className={`message-avatar-${type}`}/>
          </div>
          <div className="message-main-container">
            <div className={`message-container-${type}`}>
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
          </div>
        </>
      )
    }
  </>

  )
}
export default Message;