import type MessageProps from "../interfaces/MessageProps";

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