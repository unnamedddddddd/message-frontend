import { Link } from "react-router-dom";
import { useServer } from "@/hooks/chat";
import { WidgetCreateServer, WidgetFindServer } from "../chat/Widgets";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Server } from "../chat";

const ServerList = () => {
  const { joinServer, servers } = useServer();

  const [showWidgetCreateServer, setShowWidgetCreateServer] = useState<boolean>(false);
  const [showWidgetFindServer, setShowWidgetFindServer] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-20 rounded-2xl h-full bg-[#0d0d0f]/75 backdrop-blur-md border border-white/[0.06] gap-2 items-center py-4 overflow-y-auto px-1">
      <Link to='/personalMessages' className="group w-fit p-2 rounded-2xl duration-200
              hover:bg-white/[0.06] active:bg-white/[0.04]
              disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale-[0.5]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{ width: 48, height: 48 }}
          fill="#a3a2a3"
        >
          <path d="M448,64H64C28.656,64,0,92.656,0,128v256c0,35.344,28.656,64,64,64h384c35.344,0,64-28.656,64-64V128C512,92.656,483.344,64,448,64z M342.656,234.781l135.469-116.094c0.938,3,1.875,6,1.875,9.313v256c0,2.219-0.844,4.188-1.281,6.281L342.656,234.781z M448,96c2.125,0,4,0.813,6,1.219L256,266.938L58,97.219C60,96.813,61.875,96,64,96H448z M33.266,390.25C32.828,388.156,32,386.219,32,384V128c0-3.313,0.953-6.313,1.891-9.313L169.313,234.75L33.266,390.25z M64,416c-3.234,0-6.172-0.938-9.125-1.844l138.75-158.563l51.969,44.531C248.578,302.719,252.297,304,256,304s7.422-1.281,10.406-3.875l51.969-44.531l138.75,158.563C454.188,415.062,451.25,416,448,416H64z" />
        </svg>
      </Link>

      <div className="w-full h-px bg-white/[0.08]" />

      <div className="overflow-y-auto flex-col flex">
        {servers.map((server) => (
          <div key={server.name}>
            <Server avatar={server.avatar} serverId={server.serverId} name={server.name} onJoinServer={joinServer} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-auto">
        <div className="flex flex-col gap-3">
          <button
            className="text-[#a3a2a3] px-4 py-2 rounded-xl transition-colors hover:bg-white/[0.06] font-semibold text-lg"
            onClick={() => setShowWidgetFindServer(true)}
          >
            🔍
          </button>
          <button
            className="text-[#a3a2a3] px-4 py-2 rounded-xl transition-colors hover:bg-white/[0.06] font-semibold text-lg"
            onClick={() => setShowWidgetCreateServer(true)}
          >
            +
          </button>
        </div>
      </div>

      {createPortal(
        <div
          className={`widget-overlay-find ${showWidgetFindServer ? 'visible' : ''} fixed inset-0 flex justify-center items-start pt-10`}
          onClick={() => setShowWidgetFindServer(false)}
        >
          <div className="widget-window w-full max-w-[800px] px-4" onClick={e => e.stopPropagation()}>
            <WidgetFindServer onClose={() => setShowWidgetFindServer(false)} />
          </div>
        </div>,
        document.body
      )}

      {createPortal(
        <div className={`widget-overlay ${showWidgetCreateServer ? 'visible' : ''}`} onClick={() => setShowWidgetCreateServer(false)}>
          <div className="widget-window" onClick={e => e.stopPropagation()}>
            <WidgetCreateServer onClose={() => setShowWidgetCreateServer(false)} />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ServerList;