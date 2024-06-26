import { Box, Drawer } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

interface ISidebarProps {
  open: boolean;
  handleClose: () => void;
}

const ClientSidbarDrawer: React.FC<ISidebarProps> = ({ open, handleClose }) => (
  <Drawer
    anchor="right"
    open={open}
    onClose={handleClose}
    sx={{ background: "transparent" }}
  >
    <Box
      sx={{ width: 300 }}
      className=" backdrop-blur-[20px] bg-transparent h-full flex flex-col gap-2"
    >
      <NavLink to="/" onClick={() => handleClose}>
        All Catgories
      </NavLink>
      <NavLink to="/products" onClick={() => handleClose}>
        Products
      </NavLink>
      <NavLink to="/" onClick={() => handleClose}>
        Lmited Sales
      </NavLink>
      <NavLink to="/" onClick={() => handleClose}>
        New arrivals
      </NavLink>
    </Box>
  </Drawer>
);

export default ClientSidbarDrawer;
