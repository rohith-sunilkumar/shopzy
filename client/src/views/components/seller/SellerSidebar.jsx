import React from "react";
import { useSellerSidebar } from "../../../controllers/useSellerSidebar";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNav from "./sidebar/SidebarNav";
import SidebarFooter from "./sidebar/SidebarFooter";

const SellerSidebar = () => {
  const {
    seller,
    isCollapsed,
    setIsCollapsed,
    settingsOpen,
    isSettingsActive,
    handleLogout,
    handleSettingsClick
  } = useSellerSidebar();

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col h-full shadow-sm hidden md:flex transition-all duration-300 z-20 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <SidebarHeader
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        seller={seller}
      />

      <SidebarNav
        isCollapsed={isCollapsed}
        isSettingsActive={isSettingsActive}
        settingsOpen={settingsOpen}
        handleSettingsClick={handleSettingsClick}
      />

      <SidebarFooter
        isCollapsed={isCollapsed}
        handleLogout={handleLogout}
      />
    </aside>
  );
};

export default SellerSidebar;
