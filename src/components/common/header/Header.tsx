import {
  IconButton, Stack, TextField, Typography,
} from "@mui/material";
import { CiUser } from "react-icons/ci";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Header = () => (
  <Stack
    className="px-4 py-1 bg-white w-full relative"
    // display={{ xs: "none", sm: "none", md: "flex" }}
  >
    <Stack className=" justify-between items-center" direction="row">
      <Stack paddingY={{ xs: "15px" }}>
        <Typography variant="h6" className="logo">
          Eagles
        </Typography>
      </Stack>
      <Stack
        className="items-center gap-2 py-2"
        direction="row"
        display={{ xs: "none", sm: "none", md: "flex" }}
      >
        <TextField
          size="small"
          placeholder="Search"
          InputProps={{
            endAdornment: (
              <IconButton>
                <FaSearch className="" />
              </IconButton>
            ),
          }}
        />
        <Stack
          direction="row"
          className="flex justify-between items-center gap-2 bg-white"
        >
          <Stack direction="row" className="flex items-center">
            <FaShoppingCart className="text-[40px] text-black" />
            <Stack className="flex flex-col">
              <span className="ml-2 font-semibold text-[15px]">Cart</span>
              <span className="ml-2 font-semibold text-[15px]">$150.00</span>
            </Stack>
          </Stack>
          <Stack direction="row" className="flex items-center">
            <CiUser className="text-[40px] text-black" />
            <Stack className="flex flex-col">
              <span className="ml-2 font-semibold text-[15px]">User</span>
              <span className="ml-2 font-semibold text-[15px]">Account</span>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
);

export default Header;
