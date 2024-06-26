import React, { ReactNode, useState } from "react";

import ProtectDashboard from "../../redux/ProtectDashboard";
import SideBar from "../dashboard/SideBar";
import Header from "../dashboard/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProtectDashboard>
      <div className="flex min-h-screen relative w-[100%] bg-[#F7F8FA] overflow-x-hidden">
        <SideBar isOpen={isSidebarOpen} />
        <div className="flex flex-col relative w-[100%] lg:ml-[15%] md:w-[100%] gap-8">
          <Header toggleSidebar={toggleSidebar} />
          <main className="py-4 px-8 transition-transform lg:ml-[5%] w-[100%] sm:w-[100%] md:w-[100%] lg:w-[95%] duration-300">
            {children}
          </main>
        </div>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 left-[20%] bg-black bg-opacity-25 z-30 xl:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </ProtectDashboard>
  );
};

export default Layout;
