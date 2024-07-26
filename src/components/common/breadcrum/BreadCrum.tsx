import React from "react";
import { BiCross } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { FcClearFilters } from "react-icons/fc";
import { MdCurtainsClosed } from "react-icons/md";
import { Link, useLocation, useSearchParams } from "react-router-dom";

interface IBreadCrumbsProps {
  showFilters: boolean;
  toggleFilter: () => void;
}

const BreadCrums: React.FC<IBreadCrumbsProps> = ({
  showFilters,
  toggleFilter,
}) => {
  const [searchParams, setSearchParams] = useSearchParams({
    minPrice: "0",
    maxPrice: "",
    category: "",
    name: "",
  });
  const location = useLocation();
  let currentLink: string = "";

  const handleClick = () => {
    toggleFilter();
    setSearchParams({});
  };
  const crums = location.pathname
    .split("/")
    .filter((crum) => crum !== "")
    .map((crum) => {
      currentLink += `/${crum}`;

      const crazyThings = crum.charAt(0).toUpperCase() + crum.slice(1);

      return (
        <div key={crum} className="crumb">
          <Link role="navigation" to={crum}>
            {crazyThings}
          </Link>
        </div>
      );
    });
  return (
    <div className="w-full px-[5%] flex justify-between items-center">
      <div className="breadcrumbs flex-1 text-sm">{crums}</div>
      {location.pathname === "/products" && (
        <div className="flex items-center" onClick={handleClick}>
          <FaFilter
            className={` transition duration-300 ${!showFilters ? " rotate-180 " : ""}`}
          />
          <span>Clear Filters</span>
        </div>
      )}
    </div>
  );
};

export default BreadCrums;
