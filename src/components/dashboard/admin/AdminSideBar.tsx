// AdminSideBar.tsx
import React from "react";
import { RiHome3Line } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import NavItem from "./NavItem";

interface SidebarProps {
  isOpen: boolean;
}

const AdminSideBar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  const navItems = [
    {
      to: "/admin/dashboard",
      icon: <RiHome3Line className="text-xl" />,
      label: "Dashboard",
    },
    {
      to: "/admin/users",
      icon: <TbUsers className="text-xl" />,
      label: "Users",
    },
    {
      to: "/admin/products",
      icon: <AiFillProduct className="text-xl" />,
      label: "Products",
    },
    {
      to: "/admin/analytics",
      icon: <SiSimpleanalytics className="text-xl" />,
      label: "Analytics",
    },
    {
      to: "/admin/settings",
      icon: <IoSettingsOutline className="text-xl" />,
      label: "Settings",
    },
  ];

  return (
    <div
      className={`fixed z-40 md:z-40 xl:z-40 left-0
       w-[60%] md:w-[30%] lg:w-[20%] md:transition-none transition-all duration-300
       border-r border-[#F7F8FA] bg-white min-h-screen transform ${
         isOpen ? "translate-x-0" : "-translate-x-full"
       } lg:translate-x-0`}
    >
      <div className="flex flex-col justify-between min-h-screen py-6 dark:bg-secondary-black">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-1 py-2 font-bold text-black">
            <span className="font-[550] text-2xl">eagles</span>
            <FaCircle className="text-[12px] text-[#DB4444] mt-1" />
          </div>
          <nav className="flex flex-col gap-2 mt-10 text-dark-gray">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                // @ts-ignore
                active={location.pathname.startsWith(item.to)}
              />
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-center gap-4 cursor-pointer text-dark-gray">
          <FiLogOut className="text-xl" />
          Log Out
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
