import {
  IconButton, Stack, TextField, Typography,
} from "@mui/material";
import { CiUser } from "react-icons/ci";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

import Logo from "../auth/Logo";

interface ISerachProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<ISerachProps> = ({ searchQuery, setSearchQuery }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Stack
      className="px-4 bg-white w-full relative"
      // display={{ xs: "none", sm: "none", md: "flex" }}
      id="header"
    >
      <Stack className=" justify-between items-center" direction="row">
        <Stack paddingY={{ xs: "15px" }}>
          <Logo className="" />
        </Stack>
        <Stack
          className="items-center gap-2 py-"
          direction="row"
          display={{ xs: "none", sm: "none", md: "flex" }}
        >
          <TextField
            size="small"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <button>
                  <FaSearch className="" />
                </button>
              ),
            }}
          />
          <Stack
            direction="row"
            className="flex justify-between items-center gap-2 bg-white"
          >
            <Stack direction="row" className="flex items-center">
              <FaShoppingCart className="text-[24px] text-black" />
              <Stack className="flex flex-col">
                <span className="ml-2 font-semibold text-[12px]">Cart</span>
                <span className="ml-2 font-semibold text-[12px]">$150.00</span>
              </Stack>
            </Stack>
            <Stack>
              <Link to="/login" className="flex items-center">
                <CiUser className="text-[24px] text-black" />
                <Stack className="flex flex-col">
                  <span className="ml-2 font-semibold text-[12px]">User</span>
                  <span className="ml-2 font-semibold text-[12px]">
                    Account
                  </span>
                </Stack>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
