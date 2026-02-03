import type MessageProps from "../interfaces/MessageProps";


//ДОБАВИТЬ ВРЕМЯ
const Message = ({message}: MessageProps) => {
  return (
    <>
      <span>
        {message}
      </span>
    </>
  )
}

export default Message;