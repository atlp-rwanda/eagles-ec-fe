import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <button
      className="flex items-center justify-start gap-4 pl-16 text-gray-700 cursor-pointer lg:pl-20 xl:pl-16 2xl:pl-24"
      onClick={handleRedirect}
    >
      <FiLogOut className="text-xl" />
      Home
    </button>
  );
};

export default HomeButton;
