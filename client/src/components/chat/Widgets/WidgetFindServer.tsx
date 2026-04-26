import { getFindServer } from "@/api/chat";
import type { ServerProps } from "@/types";
import type WidgetFindServerProps from "@/types/chat/WidgetFindServerProps";
import { debounce, mapServers } from "@/utils";
import { useRef, useState } from "react";
import FindedServer from "../FindedServer";

const WidgetFindServer = ({ onClose }: WidgetFindServerProps) => {
  const [foundServers , setFoundServers] = useState<ServerProps[]>([]);
  const [prevServers, setPrevServers] = useState<ServerProps[]>([]);

  const handleFindServer = async(text: string) => {
    setPrevServers(foundServers );
    if (!text) {
      setFoundServers([]);
      return;
    }
    
    const data = await getFindServer(text);
    if (!data.success) {
      console.error(data.message);
      setFoundServers([]);
      return;
    }
    
    setFoundServers(mapServers(data.servers));
  } 

  const debouncedGetFindServer = useRef(
    debounce((value: string) => {
        handleFindServer(value);
    }, 300),
  );

  return (
    <div className="p-4 flex flex-col bg-[#353536]/90 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] max-w-[700px] gap-6">
      <div className="flex gap-5">
        <input 
        type="text" 
        placeholder="Поиск серверов"
        className="w-full p-3 rounded-lg bg-[#2a2a2b] text-white outline-none"
        onChange={(e) => debouncedGetFindServer.current(e.target.value)}
        />
        <button 
          onClick={onClose} 
          className="text-[#a3a2a3] hover:text-white transition-colors font-bold text-xl"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-col mb-auto rounded-2xl">
        {foundServers.map((server, index) => (
          <div 
            key={server.serverId}
            className={prevServers.some(s => s.serverId === server.serverId) ? '' : 'animate-slideIn'}
            style={{ animationDelay: `${index * 50}ms` }}   
          >
            <FindedServer
              serverId={server.serverId}
              name={server.name}
              avatar={server.avatar}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetFindServer;
