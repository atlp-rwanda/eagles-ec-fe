import {
  IconButton, Stack, TextField, Typography,
} from "@mui/material";
import { LuUser } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import React, { useEffect, useState, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdHeartEmpty } from "react-icons/io";

import { getProfile } from "../../../redux/reducers/profileSlice";
import Logo from "../auth/Logo";
import { RootState } from "../../../redux/store";
import { cartManage } from "../../../redux/reducers/cartSlice";
import { useAppDispatch } from "../../../redux/hooks";

interface ISerachProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setRefetch: React.Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<ISerachProps> = ({ searchQuery, setSearchQuery }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  let userInfo;
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    userInfo = JSON.parse(atob(accessToken.split(".")[1]));
  }
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) {
      try {
        const userInfo = JSON.parse(atob(accessToken.split(".")[1]));
        if (userInfo) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Invalid token format", error);
      }
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchQuery) {
      searchParams.set("name", searchQuery);
    } else {
      searchParams.delete("name");
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

    window.history.pushState(null, "", newUrl);
  }, [searchQuery]);

  const dispatches = useAppDispatch();
  useEffect(() => {
    dispatch(cartManage());
  }, [dispatches]);
  const userCart = useSelector((state: RootState) => state.cart.data);
  return (
    <Stack className="px-[5%] bg-white w-full relative" id="header">
      <Stack className=" justify-between gap-64 items-center" direction="row">
        <Stack paddingY={{ xs: "15px" }}>
          <Logo className="" />
        </Stack>
        <Stack
          className="w-full"
          display={{ xs: "none", sm: "none", md: "flex" }}
        >
          <TextField
            size="small"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
            InputProps={{
              endAdornment: (
                <button>
                  <FaSearch className="" />
                </button>
              ),
            }}
          />
        </Stack>
        <Stack
          direction="row"
          className="flex justify-between items-center gap-6 bg-white"
          display={{ xs: "none", sm: "none", md: "flex" }}
        >
          <Stack direction="row" className="flex items-center relative">
            <Link to="/carts">
              <IoCartOutline className="text-[24px] cursor-pointer text-black" />
            </Link>
            <Stack className="flex flex-col ">
              {!localStorage.getItem("accessToken") ? (
                ""
              ) : (
                <div className="absolute w-5 h-5 bg-red-500 -top-3  -right-3 rounded-full text-center text-white text-[12px] flex justify-center items-center">
                  <span className="">{userCart.length}</span>
                </div>
              )}
            </Stack>
          </Stack>
          <Stack>
            <IoMdHeartEmpty className="text-[24px] text-black" />
          </Stack>
          <Stack className="">
            {isLoggedIn ? (
              <Link to="/profile" className="flex items-center">
                <LuUser className="text-[24px] text-black" />
                <Stack className="flex flex-col">
                  <span className="ml-2 font-semibold text-[12px]">
                    {userInfo.name.split(" ")[0]}
                  </span>
                </Stack>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center">
                <LuUser className="text-[24px] text-black" />
                <Stack className="flex flex-col">
                  <span className="ml-2 font-semibold text-[12px]">User</span>
                  <span className="ml-2 font-semibold text-[12px]">
                    Account
                  </span>
                </Stack>
              </Link>
            )}
          </Stack>
        </Stack>
        {/* </Stack> */}
      </Stack>
    </Stack>
  );
};

export default Header;
