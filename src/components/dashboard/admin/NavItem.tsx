import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `py-2.5 px-4 flex items-center gap-2 text-lg rounded transition duration-200 ${
      isActive ? "text-red-500" : "text-dark-gray"
    }`}
  >
    {icon}
    {label}
  </NavLink>
);

export default NavItem;
