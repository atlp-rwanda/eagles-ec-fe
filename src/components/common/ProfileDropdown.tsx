import React from "react";
import { Link } from "react-router-dom";

import { useLogout } from "../dashboard/admin/LogoutContext";

interface ProfileDropdownProps {
  userInfo: any;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ userInfo }) => {
  const { openLogoutModal } = useLogout();

  return (
    <div className="absolute right-1 md:right-8 lg:right-8 top-12 w-48 bg-white border-t border-[#DB4444] rounded-md shadow-lg z-50">
      <ul className="py-1">
        {userInfo ? (
          <>
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
              >
                Profile
              </Link>
            </li>
            {userInfo.roleId === 1 && (
              <li>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                >
                  My Orders
                </Link>
              </li>
            )}
            {(userInfo.roleId === 2 || userInfo.roleId === 3) && (
              <li>
                <Link
                  to={userInfo.roleId === 2 ? "/dashboard" : "/admin/users"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                >
                  My Dashboard
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={openLogoutModal}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-slate-100"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileDropdown;
