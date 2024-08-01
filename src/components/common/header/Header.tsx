import React, {
  useEffect, useState, SetStateAction, useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { LuUser } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";

import { fetchWishes } from "../../../redux/reducers/wishListSlice";
import { getProfile } from "../../../redux/reducers/profileSlice";
import Logo from "../auth/Logo";
import { RootState } from "../../../redux/store";
import { cartManage } from "../../../redux/reducers/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ProfileDropdown from "../ProfileDropdown";
import { NotificationPopup } from "../../cards/Notification";

import SearchSuggestions from "./SearchSuggestions";

interface ISerachProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setRefetch: React.Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<ISerachProps> = ({ searchQuery, setSearchQuery }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Accessories",
    "Phone",
    "Laptops",
    "Furnitures",
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const userInfo = localStorage.getItem("accessToken")
    ? JSON.parse(atob(localStorage.getItem("accessToken")!.split(".")[1]))
    : null;
  const [target, setTarget] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { unreadCount, currentUser } = useAppSelector(
    (state) => state.notifications,
  );

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    }
  }, [userInfo]);
  const profile = JSON.parse(localStorage.getItem("userInfo") || "{}");

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

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(cartManage());
    }
  }, [dispatch]);

  const userCart = useSelector((state: RootState) => state.cart.data);
  const wished = useSelector((state: RootState) => state.wishes.wishes);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileDropdownRef.current
      && !profileDropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/products?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  const handleSearchClick = () => {
    navigate(`/products?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleClose = () => {
    setTarget(null);
  };

  return (
    <Stack
      className="px-[5%] z-40 2xl:px-[8%] border-t bg-white w-full relative "
      id="header"
    >
      <div className="justify-between gap-20 md:gap-18 w-full relative flex flex-row lg:gap-40 xl:gap-72 items-center">
        <Stack paddingY={{ xs: "15px" }}>
          <Logo className="" />
        </Stack>
        <div className="hidden md:block relative w-full">
          <span
            className="absolute inset-y-0 cursor-pointer right-0 pr-4 pl-4 flex bg-[#DB4444] items-center pointer-events-auto"
            onClick={handleSearchClick}
          >
            <FiSearch className="text-white" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-1 text-gray-500 border-[1.5px] w-full outline-none bg-bg-gray border-[#DB4444] focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={handleSearch}
          />
          {showSuggestions && (
            <SearchSuggestions
              suggestions={suggestions}
              onSelect={handleSelectSuggestion}
            />
          )}
        </div>
        <div className="flex justify-between items-center relative w-[40%] md:w-[40%] lg:w-[40%] gap-3 bg-white">
          <div className="flex items-center relative">
            <Link to="/carts">
              <IoCartOutline className="text-[24px] cursor-pointer text-black" />
            </Link>
            <div className="flex flex-col ">
              {userCart?.length > 0 && (
                <div className="absolute w-5 h-5 bg-red-500 -top-3  -right-3 rounded-full text-center text-white text-[12px] flex justify-center items-center">
                  <span className="">{userCart?.length}</span>
                </div>
              )}
            </div>
          </div>
          <div
            className="flex items-center justify-center relative p-3 "
            onClick={(e) => setTarget(e.currentTarget)}
          >
            <FaRegBell className="text-dark-gray size-6 cursor-pointer" />
            <div className="absolute w-5 h-5 bg-red-500 -top-0  -right-0 rounded-full text-center text-white text-[12px] flex justify-center items-center">
              <span className="">{unreadCount}</span>
            </div>
          </div>
          <div className="relative">
            {localStorage.getItem("accessToken") && userInfo.roleId === 2 ? (
              <Link to="dashboard/wishes">
                <IoMdHeartEmpty className="text-[24px] cursor-pointer text-black" />
              </Link>
            ) : (
              <Link to="/wishes">
                <IoMdHeartEmpty className="text-[24px] cursor-pointer text-black" />
              </Link>
            )}
            <div className="flex flex-col ">
              {wished?.length > 0 && (
                <div className="absolute w-5 h-5 bg-red-500 -top-3  -right-3 rounded-full text-center text-white text-[12px] flex justify-center items-center">
                  <span className="">{wished?.length}</span>
                </div>
              )}
            </div>
          </div>
          {isLoggedIn ? (
            <div
              className="flex items-center gap-2 relative"
              ref={profileDropdownRef}
            >
              {profile?.profile?.profileImage ? (
                <img
                  src={profile?.profile?.profileImage}
                  alt={profile.username}
                  className="h-10 w-10 cursor-pointer rounded-full"
                  onClick={toggleDropdown}
                />
              ) : (
                <div
                  className={`hover:bg-slate-100 ${dropdownOpen ? "bg-slate-100" : "bg-slate-100"} rounded-full p-2 cursor-pointer`}
                  onClick={toggleDropdown}
                >
                  <LuUser className="text-[24px] text-black" />
                </div>
              )}
              <Stack className="flex flex-col">
                <span className="hidden lg:block select-none font-semibold text-[12px]">
                  {profile?.name ? profile.name : userInfo.name}
                </span>
              </Stack>
              {dropdownOpen && <ProfileDropdown userInfo={userInfo} />}
            </div>
          ) : (
            <Link to="/login" className="flex items-center">
              <LuUser className="text-[24px] text-black" />
              <div className="hidden md:flex flex-col">
                <span className="ml-2 font-semibold text-[12px] whitespace-nowrap">
                  Sign In
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
      <NotificationPopup
        anchorEl={target}
        open={Boolean(target)}
        handleClose={handleClose}
      />
    </Stack>
  );
};

export default Header;
