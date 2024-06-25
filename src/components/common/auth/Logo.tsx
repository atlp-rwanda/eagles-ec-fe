import React from "react";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ILogoProps {
  className: string;
}

const Logo: React.FC<ILogoProps> = ({ className }) => (
  <Link
    to="/"
    className={`text-black font-bold text-[20px] z-50 flex items-center gap-1 ${className}`}
  >
    <h1 className="font-medium text-[26px]">
      <span className="font-[550] text-heading"> eagles</span>
    </h1>
    <FaCircle className="text-sm text-[#DB4444] mt-6" />
  </Link>
);

export default Logo;
