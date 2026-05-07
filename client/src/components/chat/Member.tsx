import type { MembersProps } from "@/types";
import { SERVER_URL } from "../../config";

const Member = ({id, avatar, name}: MembersProps) => {

  return (
  <button 
    className="group mb-2 w-full flex items-center p-2 rounded-xl transition-all duration-200 
              hover:bg-[#414243]/90 active:bg-[#4e4f51]/90 
              disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-[0.5]"
    title={name}
  >
    <div className="relative shrink-0">
      <img 
        src={`${SERVER_URL}${avatar}`} 
        alt={name}
        className="w-8 h-8 rounded-full border border-[#6d7275]/30 object-cover" 
      />
      
    </div>
    <div className="flex flex-col items-start px-3">
      <span className="text-white font-medium text-md leading-tight truncate">
        {name}
      </span>
    </div>
  </button>
);
};

export default Member;
