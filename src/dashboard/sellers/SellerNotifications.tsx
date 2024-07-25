import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaEnvelopeOpenText } from "react-icons/fa";

import Layout from "../../components/layouts/SellerLayout";
import { useAppSelector } from "../../redux/hooks";

const SellerNotifications = () => {
  const { notifications } = useAppSelector((state) => state.notifications);

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

  return (
    <Layout>
      <div className="mt-24 mb-4">
        <div>
          {sortedNotifications.map((notification, index) => (
            <Link
              to={`/dashboard/notifications/${notification.id}`}
              key={index}
              className={`flex sm:flex-row flex-col justify-between items-center mb-[3px] p-4 rounded-md gap-4 ${notification.isRead ? "bg-[#FFFFFF]" : "bg-[#E1ECF4]"}`}
            >
              <div className="flex gap-2 items-center justify-between">
                {notification.isRead ? (
                  <FaEnvelopeOpenText className="min-h-[30px] min-w-[30px]" />
                ) : (
                  <FaEnvelope className="min-h-[30px] min-w-[30px]" />
                )}
                <div>
                  <p className="text-[13px] sm:text-[15px] md:text-[17px]">
                    {notification.message}
                  </p>
                  <p className="text-[13px] sm:text-[15px] md:text-[17px]">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-[13px] sm:text-[15px] md:text-[17px]">
                View Detail
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SellerNotifications;
