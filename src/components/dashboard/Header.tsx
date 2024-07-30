import { FiSearch, FiMenu } from "react-icons/fi";
import { FaRegBell, FaCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile } from "../../redux/reducers/profileSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { NotificationPopup } from "../cards/Notification";
import ProfileDropdown from "../common/ProfileDropdown";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const { profile } = useSelector((state: RootState) => state.usersProfile);
  const dispatch = useAppDispatch();
  const { unreadCount } = useAppSelector((state) => state.notifications);
  const [showDropdown, setShowDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const profileImage = profile?.profileImage;
  const userInfo = localStorage.getItem("accessToken")
    ? JSON.parse(atob(localStorage.getItem("accessToken")!.split(".")[1]))
    : null;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileDropdownRef.current
      && !profileDropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setTarget(null);
  };

  return (
    <>
      <header className="flex lg:w-[80%] lg:ml-[5%] px-8 fixed z-30 top-0 items-center w-full justify-between py-4 bg-white dark:bg-secondary-black">
        <div className="relative flex items-center justify-between w-full lg:hidden">
          <FiMenu className="text-black w-6 h-6 mr-3" onClick={toggleSidebar} />
          <div className="flex items-center gap-4">

        </div>
        </div>
        <div className="flex items-center justify-end lg:justify-between  w-full">
          <div className="hidden lg:block relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FiSearch className="text-dark-gray" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-10 py-2 rounded-md dark:border-[0.3px] outline-none bg-[#F7F8FA] focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-6">
            <div
              className="flex items-center justify-center relative p-3"
              onClick={(e) => setTarget(e.currentTarget)}
            >
              <FaRegBell className="text-dark-gray size-6 cursor-pointer" />
              <p className="bg-red-500 text-white rounded-full  text-[10px] absolute top-0 right-0 px-2 py-1">
                {unreadCount}
              </p>
            </div>

            <div
            className="flex items-center space-x-1 h-full relative cursor-pointer"
            ref={profileDropdownRef}
          >
            <img
              src={profileImage}
              alt="User Avatar"
              className="w-10 h-10 object-cover rounded-full"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <h4>{profile?.fullName}</h4>
            <FaAngleDown className="hidden lg:block" onClick={() => setShowDropdown(!showDropdown)} />
            {showDropdown && <ProfileDropdown userInfo={userInfo} />}
          </div>
          </div>
        </div>
      </header>
      <NotificationPopup
        anchorEl={target}
        open={Boolean(target)}
        handleClose={handleClose}
      />
    </>
  );
};

export default Header;
