import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaEnvelopeOpenText } from "react-icons/fa";
import { Button } from "@mui/material";

import { useAppSelector } from "../../../redux/hooks";
import { getCurrentUser } from "../../../utils/currentuser";

const UserNotifications = () => {
  const { notifications, currentUser } = useAppSelector(
    (state) => state.notifications,
  );

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    // @ts-ignore
    return date.toLocaleDateString("en-US", options);
  };

  const sortedNotifications = notifications
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  if (notifications.length < 1) {
    return (
      <div
        data-testid="no-notifications"
        className="flex justify-center items-center gap-[12px]"
      >
        <p className="text-[16px] sm:text-[18px] md:text-[20px]">
          You dont have any notification yet.
        </p>
      </div>
    );
  }

  const goToLogin = () => {
    window.location.href = "/login";
  };

  if (!getCurrentUser) {
    return (
      <div
        data-testid="login-prompt"
        className="flex justify-center items-center gap-[12px]"
      >
        <Button
          size="medium"
          variant="contained"
          color="error"
          onClick={() => goToLogin}
          data-testid="login-button"
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div
      data-testid="notifications-list"
      className={`${currentUser && currentUser.roleId === 2 && "mt-24"} mb-4`}
    >
      <div>
        {sortedNotifications.map((notification, index) => (
          <Link
            to={
              currentUser && currentUser.roleId === 2
                ? `/dashboard/notifications/${notification.id}`
                : `/notifications/${notification.id}`
            }
            key={index}
            data-testid={`notification-${notification.id}`}
            className={`flex sm:flex-row flex-col justify-between items-center mb-[3px] p-4 rounded-md gap-4 ${notification.isRead ? "bg-[#FFFFFF]" : "bg-[#E1ECF4]"}`}
          >
            <div className="flex gap-2 items-center justify-between">
              {notification.isRead ? (
                <FaEnvelopeOpenText
                  data-testid="read-icon"
                  className="min-h-[30px] min-w-[30px]"
                />
              ) : (
                <FaEnvelope
                  data-testid="unread-icon"
                  className="min-h-[30px] min-w-[30px]"
                />
              )}
              <div>
                <p
                  data-testid={`notification-message-${notification.id}`}
                  className="text-[13px] sm:text-[15px] md:text-[17px]"
                >
                  {notification.message}
                </p>
                <p
                  data-testid={`notification-date-${notification.id}`}
                  className="text-[13px] sm:text-[15px] md:text-[17px]"
                >
                  {formatDate(notification.createdAt)}
                </p>
              </div>
            </div>
            <p
              data-testid={`view-detail-${notification.id}`}
              className="text-[13px] sm:text-[15px] md:text-[17px]"
            >
              View Detail
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserNotifications;
