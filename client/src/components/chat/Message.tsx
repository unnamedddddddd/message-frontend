import { SERVER_URL } from "@/config";
import type { MessageProps } from "@/types";

const Message = ({message, userName, userAvatar, type, renderTime}: MessageProps) => {
  return (
    <>
      {type === 'my' ? (
        <>
          <div className="flex flex-col"> 
            <div className="flex flex-col bg-gradient-to-br from-[#616366] to-[#676b6e] p-[12px_16px] border-3 border-[#4e4f51]/20 rounded-[18px_18px_4px_18px]"> 
              <div className="ml-auto mb-[5px] text-blue-400"> 
                {userName}
              </div>
              <div className="flex justify-end"> 
                <span className="text-white break-words line-height-[1.4]">
                  {message}
                </span>
              </div>
              <div className="text-[10px] flex justify-end text-[#a3a2a3]"> 
                {renderTime}
              </div> 
            </div>
          </div>
          <div className="flex items-center gap-[10px]"> 
            <img 
              src={`${SERVER_URL}${userAvatar}`} 
              alt={`Аватар пользователя ${userName}`}  
              className="w-[40px] h-[40px] object-cover rounded-full border-2 border-white/10 transition-all duration-300 hover:border-white/30 hover:scale-[1.05]"
            /> 
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-[10px]">
            <img 
              src={`${SERVER_URL}${userAvatar}`} 
              alt={`Аватар пользователя ${userName}`}  
              className="w-[40px] h-[40px] object-cover rounded-full border-2 border-white/10 transition-all duration-300"
            /> 
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col bg-gradient-to-br from-[#616366] to-[#676b6e] p-[12px_16px] border-3 border-[#4e4f51]/20 rounded-[18px_18px_18px_4px]"> 
              <div className="mr-auto mb-[5px] text-red-400"> 
                {userName}
              </div>
              <div className="flex justify-start">
                <span className="text-white break-words line-height-[1.4]">
                  {message}
                </span>
              </div>
              <div className="text-[10px] flex justify-start text-[#a3a2a3]">
                {renderTime}
              </div> 
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Message;
