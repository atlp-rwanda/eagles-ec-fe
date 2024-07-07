import React, { ReactNode, useState } from "react";

import Header from "../dashboard/Header";
import AdminSideBar from "../dashboard/admin/AdminSideBar";
import ProtectDashboard from "../../redux/ProtectDashboard";
import ProtectAdminDashboard from "../../redux/ProtectAdminDashboard";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProtectAdminDashboard>
      <div className="flex min-h-screen relative w-[100%] bg-[#F7F8FA] overflow-x-hidden">
        <AdminSideBar isOpen={isSidebarOpen} />
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
    </ProtectAdminDashboard>
  );
};

export default AdminLayout;
