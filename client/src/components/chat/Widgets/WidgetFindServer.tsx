import { getFindServer } from "@/api/chat";
import type { ServerProps } from "@/types";
import type WidgetFindServerProps from "@/types/chat/WidgetFindServerProps";
import { debounce, mapServers } from "@/utils";
import { useRef, useState } from "react";
import FoundServer from "../FoundServer";

const WidgetFindServer = ({ onClose }: WidgetFindServerProps) => {
  const [foundServers, setFoundServers] = useState<ServerProps[]>([]);
  const [prevServers, setPrevServers] = useState<ServerProps[]>([]);

  const handleFindServer = async (text: string) => {
    setPrevServers(foundServers);
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
  };

  const debouncedGetFindServer = useRef(
    debounce((value: string) => { handleFindServer(value); }, 300),
  );

  return (
    <div className="p-6 flex flex-col bg-[#0d0d0f]/90 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.6)] max-w-[700px] gap-5">
      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Поиск серверов..."
          className="flex-1 bg-black/60 border border-white/[0.08] rounded-xl p-3 text-[#a3a2a3] placeholder:text-[#a3a2a3]/40 focus:outline-none focus:border-white/20 transition-colors"
          onChange={(e) => debouncedGetFindServer.current(e.target.value)}
        />
        <button onClick={onClose} className="text-white/30 hover:text-white transition-colors font-bold text-xl leading-none flex-shrink-0">✕</button>
      </div>
      <div className="flex flex-col rounded-xl overflow-hidden">
        {foundServers.map((server, index) => (
          <div
            key={server.serverId}
            className={prevServers.some(s => s.serverId === server.serverId) ? '' : 'animate-slideIn'}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <FoundServer serverId={server.serverId} name={server.name} avatar={server.avatar} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetFindServer;
