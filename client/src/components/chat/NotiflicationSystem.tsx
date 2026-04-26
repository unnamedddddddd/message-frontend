import type { NotificationSystemProps } from "@/types";

const NotiflicationSystem = ({ type, message, onClose }: NotificationSystemProps) => {
  const typeClasses = {
    error: "bg-[#5A2A2A] border-[#8B3A3A] text-[#F0F0F0]",
    success: "bg-[#1E4A3B] border-[#2E7D5E] text-[#F0F0F0]",
    info: "bg-[#2d3035] border-[#4e5157] text-white",
    warning: "bg-[#4a3f1e] border-[#7d6b2e] text-orange-400",
  };

  const labelClasses = {
    error: "text-red-300",
    success: "text-green-300",
    info: "text-blue-300",
    warning: "text-orange-300",
  };

  return (
    <div 
      className={`max-w-[350px] w-full p-4 rounded-xl border-4 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-right-5 ${typeClasses[type]}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-bold uppercase tracking-wider">
          <span className={labelClasses[type]}>{type}</span>
        </div>
        <button 
          onClick={onClose} 
          type="button" 
          className="text-[#a3a2a3] hover:text-white transition-colors font-bold text-lg leading-none"
        >
          ✕
        </button>
      </div>
      
      <div className="text-sm leading-relaxed break-words">
        {message}
      </div>
    </div>
  );
};

export default NotiflicationSystem;
