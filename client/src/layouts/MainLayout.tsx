import { Header } from "@/components/global";
import { SocketProvider } from "@/providers/SocketProvider";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <SocketProvider>
        <Header />
        <Outlet />
      </SocketProvider>
    </div>
  );
}

export default MainLayout;