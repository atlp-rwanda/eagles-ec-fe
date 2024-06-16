import React from "react";
import { RiHome3Line, RiAddBoxLine } from "react-icons/ri";
import { IoBriefcaseOutline, IoSettingsOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdInsertChartOutlined } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}

const SideBar: React.FC<SidebarProps> = ({ isOpen }) => (
  <div
    className={`fixed z-40 md:z-40 xl:z-40 left-0
          w-[60%] md:w-[30%] lg:w-[20%] md:transition-none transition-all duration-300
       border-r border-[#F7F8FA] bg-white min-h-screen transform ${
         isOpen ? "translate-x-0" : "-translate-x-full"
       } lg:translate-x-0`}
  >
    <div className="flex flex-col justify-between py-6 dark:bg-secondary-black min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="text-black font-bold justify-center py-2 flex items-center gap-1">
          <span className="font-[550] text-2xl"> eagles</span>
          <FaCircle className="text-[12px] text-[#DB4444] mt-1" />
        </div>
        <nav className="mt-10 flex flex-col gap-2 text-dark-gray">
          <NavLink
            // @ts-ignore
            activeclassname="active"
            to="/dashboard"
            className="py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200"
          >
            <RiHome3Line className="text-xl" />
            {' '}
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            className="py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200"
          >
            <AiFillProduct className="text-xl" />
            {' '}
            Products
          </NavLink>
          <NavLink
            to="/dashboard/addproduct"
            className="py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200"
          >
            <RiAddBoxLine className="text-xl" />
            {' '}
            Add product
          </NavLink>
          <NavLink
            to="/orders"
            className="py-2.5 px-4 flex items-center relative gap-2 text-lg rounded transition duration-200 "
          >
            <IoBriefcaseOutline className="text-xl" />
            <span>Orders</span>
            <p className="bg-brand-blue text-white absolute right-5 flex items-center justify-center rounded-full text-sm p-2 h-[24px] w-[24px]">
              8
            </p>
          </NavLink>
          <NavLink
            to="/wishes"
            className="py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200"
          >
            <MdInsertChartOutlined className="text-xl" />
            {' '}
            Wishes
          </NavLink>
          <NavLink
            to="/settings"
            className="py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200"
          >
            <IoSettingsOutline className="text-xl" />
            {' '}
            Settings
          </NavLink>
        </nav>
      </div>
      <div className=" flex justify-center items-center gap-4 cursor-pointer text-dark-gray">
        <FiLogOut className="text-xl" />
        {' '}
        Log Out
      </div>
    </div>
  </div>
);

export default SideBar;
