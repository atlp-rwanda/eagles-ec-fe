import { Divider, Menu, MenuItem } from "@mui/material";
import React from "react";
import { FaEnvelope, FaEnvelopeOpenText } from "react-icons/fa";
import { MdDiversity3 } from "react-icons/md";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";

interface INotificationPop {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  open: boolean;
}

export const NotificationPopup: React.FC<INotificationPop> = ({
  anchorEl,
  handleClose,
  open,
}) => {
  const { notifications } = useAppSelector((state) => state.notifications);

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "lock-button",
        role: "listbox",
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 300,
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: "calc(50% - 10px)",
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {notifications.length > 0 ? (
        notifications.slice(0, 5).map((notification, index) => (
          <>
            <Link
              to={`/dashboard/notifications/${notification.id}`}
              onClick={handleClose}
              key={index}
              className="flex justify-between items-center mb-[3px] px-2 gap-4 $"
            >
              {notification.isRead ? (
                <FaEnvelopeOpenText className=" min-h-[30px] min-w-[30px] " />
              ) : (
                <FaEnvelope className=" text-[30px]" />
              )}
              <p className={` text-[13px]  `}>{notification.message}</p>
            </Link>
            <Divider />
          </>
        ))
      ) : (
        <div>You Dont have any notification yet </div>
      )}

      <Link
        to="/dashboard/notifications"
        onClick={handleClose}
        className=" flex items-center justify-center text-center text-blue-700"
      >
        <div>View All</div>
      </Link>
    </Menu>
  );
};
