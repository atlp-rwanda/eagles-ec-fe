import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchFilterBar = ({ onSearch, onFilter, roles }) => (
  <div className="flex flex-col items-center justify-between w-full p-4 my-5 space-y-4 rounded-lg md:flex-row md:space-y-0 md:space-x-4">
    {/* Search Input */}
    <div className="relative w-full md:w-auto">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FiSearch className="text-dark-gray" />
      </span>
      <input
        type="text"
        placeholder="Search name, email..."
        className="pl-10 pr-10 py-2 w-full md:w-auto rounded-md border bg-[#F7F8FA] focus:outline-none"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>

    {/* Filter Dropdown */}
    <div className="flex items-center w-full md:w-auto">
      <select
        id="filter"
        className="w-full px-2 py-1 border border-gray-300 rounded-md md:w-auto"
        onChange={(e) => onFilter(e.target.value)}
      >
        <option key="All" value="All">
          Filter by role
        </option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default SearchFilterBar;
