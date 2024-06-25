import React from "react";
import { FaFilter } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

interface IBreadCrumbsProps {
  showFilters: boolean;
  toggleFilter: () => void;
}

const BreadCrums: React.FC<IBreadCrumbsProps> = ({
  showFilters,
  toggleFilter,
}) => {
  const location = useLocation();
  let currentLink: string = "";

  const handleClick = () => {
    toggleFilter();
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
    <div className=" px-3 flex justify-between items-center">
      <div className="breadcrumbs flex-1">{crums}</div>
      {location.pathname === "/products" && (
        <div className="flex items-center" onClick={handleClick}>
          <FaFilter
            className={` transition duration-300 ${!showFilters ? " rotate-180 " : ""}`}
          />
          {" "}
          <span>Filters</span>
        </div>
      )}
    </div>
  );
};

export default BreadCrums;
