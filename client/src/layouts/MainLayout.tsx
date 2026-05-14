import { ServerList } from "@/components/chat";
import { Header } from "@/components/global";
import { SocketProvider } from "@/providers/SocketProvider";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
   <SocketProvider>
      <div className="flex h-screen bg-transparent p-2 min-w-[768px]">
        <ServerList />
        
        <div className="flex flex-col flex-1 overflow-hidden px-2 gap-2">
          <Header />
          <main className="flex-1 overflow-hidden rounded-xl">
            <Outlet />
          </main>
        </div>
      </div>
    </SocketProvider>
  )
}

export default MainLayout; 
