import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

const SellerLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen w-full relative">
      <div className="sticky top-0 h-screen shrink-0 z-20">
        <SellerSidebar />
      </div>
      <main className="flex-1 min-w-0 w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
