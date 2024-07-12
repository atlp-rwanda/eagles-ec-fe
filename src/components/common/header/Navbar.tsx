/* eslint-disable arrow-body-style */
import { IconButton, Stack, TextField } from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

import ClientSidbarDrawer from "../drawrers/ClientSidbarDrawer";

interface InavbarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
}

const Navbar: React.FC<InavbarProps> = ({ searchQuery, setSearchQuery }) => {
  const [open, setOpen] = useState(false);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack className="bg-[#DB4444] " paddingX={{ xs: "10px", sm: 0, md: 0 }}>
      <Stack
        className="max-w-[1440px] py-4 lg:mx-auto lg:w-[90%] w-[100%]"
        width={{ xs: "100%", sm: "100%", md: "90%" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <TextField
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <FaSearch style={{ color: "white" }} />
                  </IconButton>
                ),
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              className="flex-1 border-white"
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "none",
                },
              }}
              size="small"
              variant="outlined"
            />
            <MdMenu
              fontSize={30}
              className="lg:hidden flex text-white"
              onClick={() => setOpen(true)}
            />
            <Stack
              direction="row"
              gap={2}
              display={{ xs: "none", sm: "none", md: "flex" }}
            >
              <MdMenu fontSize={30} className="hidden lg:flex text-white" />
              <NavLink to="/" className=" text-white">
                All categories
              </NavLink>
              <NavLink to="/products" className=" text-white">
                Products
              </NavLink>
              <NavLink to="/" className=" text-white">
                Blogs
              </NavLink>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap={2}
            display={{ xs: "none", sm: "none", md: "flex" }}
          >
            <NavLink to="/" className="text-nowrap text-white">
              Limited Sales
            </NavLink>
            <NavLink to="/" className="text-nowrap text-white">
              Best Offer
            </NavLink>
            <NavLink to="/" className="text-nowrap text-white">
              New Arrival
            </NavLink>
            <NavLink to="/orders" className="text-nowrap text-white">
              Orders
            </NavLink>
          </Stack>
        </Stack>
      </Stack>
      <ClientSidbarDrawer open={open} handleClose={handleClose} />
    </Stack>
  );
};

export default Navbar;
