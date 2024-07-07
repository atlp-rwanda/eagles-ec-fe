import React from "react";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ILogoProps {
  className: string;
}

const Logo: React.FC<ILogoProps> = ({ className }) => (
  <Link
    to="/"
    className={`text-black font-bold z-50 flex  items-center gap-1 ${className}`}
  >
    <h1 className="font-medium p-0">
      <span className="font-[550] text-[30px] "> eagles</span>
    </h1>
    <FaCircle className="text-[12px] text-[#DB4444] mt-2 p-0" />
  </Link>
);

export default Logo;
