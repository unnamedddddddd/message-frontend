import { Header } from "@/components/global";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;