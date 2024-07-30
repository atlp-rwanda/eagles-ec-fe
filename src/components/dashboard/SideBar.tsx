import React from "react";
import { RiHome3Line, RiAddBoxLine } from "react-icons/ri";
import { IoBriefcaseOutline, IoSettingsOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdInsertChartOutlined } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

import HomeButton from "./HomeButton";

interface SidebarProps {
  isOpen: boolean;
}

const SideBar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  const getLinkClass = (path: string) =>
    (location.pathname === path ? "text-primary" : "text-dark-gray");

  return (
    <div
      className={`fixed z-40 md:z-40 xl:z-40 left-0
          w-[60%] md:w-[30%] lg:w-[20%] md:transition-none transition-all duration-300
       border-r border-[#F7F8FA] bg-white min-h-screen transform ${
         isOpen ? "translate-x-0" : "-translate-x-full"
       } lg:translate-x-0`}
    >
      <div className="flex flex-col justify-between py-6 min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <Link to="/">
            <div className="flex items-center justify-center gap-1 py-2 font-bold text-black">
              <span className="font-[550] text-2xl"> eagles</span>
              <FaCircle className="text-[12px] text-[#DB4444] mt-1" />
            </div>
          </Link>
          <nav className="flex flex-col gap-2 mt-10">
            <NavLink
              to="/dashboard"
              className={`py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200 ${getLinkClass(
                "/dashboard",
              )}`}
            >
              <RiHome3Line className="text-xl" />
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/products"
              className={`py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200 ${getLinkClass(
                "/dashboard/products",
              )}`}
            >
              <AiFillProduct className="text-xl" />
              Products
            </NavLink>
            <NavLink
              to="/dashboard/addproduct"
              className={`py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200 ${getLinkClass(
                "/dashboard/addproduct",
              )}`}
            >
              <RiAddBoxLine className="text-xl" />
              Add product
            </NavLink>
            <NavLink
              to="/dashboard/orders"
              className={`py-2.5 px-4 flex items-center relative gap-2 text-lg rounded transition duration-200 ${getLinkClass(
                "/dashboard/orders",
              )}`}
            >
              <IoBriefcaseOutline className="text-xl" />
              <span>Orders</span>
              <p className="bg-brand-blue text-white absolute right-5 flex items-center justify-center rounded-full text-sm p-2 h-[24px] w-[24px]">
                8
              </p>
            </NavLink>
            <NavLink
              to="/dashboard/wishes"
              className={`py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200 ${getLinkClass(
                "/dashboard/wishes",
              )}`}
            >
              <MdInsertChartOutlined className="text-xl" />
              Wishes
            </NavLink>
            <NavLink
              to="/settings"
              className={`py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200 ${getLinkClass(
                "/settings",
              )}`}
            >
              <IoSettingsOutline className="text-xl" />
              Settings
            </NavLink>
          </nav>
        </div>
        <HomeButton />
      </div>
    </div>
  );
};

export default SideBar;
