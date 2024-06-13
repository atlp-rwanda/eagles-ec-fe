/* eslint-disable arrow-body-style */
import { IconButton, Stack, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Stack className="bg-red-400 " paddingX={{ xs: "10px", sm: 0, md: 0 }}>
      <Stack
        className=" max-w-[1440px] py-6 lg:mx-auto lg:w-[90%] w-[100%]"
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
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "none",
                },
              }}
              size="small"
              variant="outlined"
            />
            <MdMenu fontSize={30} className="lg:hidden flex" />
            <Stack
              direction="row"
              gap={2}
              display={{ xs: "none", sm: "none", md: "flex" }}
            >
              <MdMenu fontSize={30} className="hidden lg:flex" />
              <NavLink to="/">All categories</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/">Blogs</NavLink>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap={2}
            display={{ xs: "none", sm: "none", md: "flex" }}
          >
            <NavLink to="/" className="text-nowrap">
              Limited Sales
            </NavLink>
            <NavLink to="/" className="text-nowrap">
              Best Offer
            </NavLink>
            <NavLink to="/" className="text-nowrap">
              New Arrival
            </NavLink>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
