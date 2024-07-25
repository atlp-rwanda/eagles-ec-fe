import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEnvelope, FaEnvelopeOpenText } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Layout from "../../components/layouts/SellerLayout";
import { readNotification } from "../../redux/reducers/notificationSlice";

const NotificationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { notifications } = useAppSelector((state) => state.notifications);

  const dispatch = useAppDispatch();

  const notification = notifications.find(
    // @ts-ignore
    (notif) => notif.id === parseInt(id, 10),
  );

  if (!notification) {
    return (
      <Layout>
        <div className="mt-24 mb-4">
          <p>Notification not found!</p>
        </div>
      </Layout>
    );
  }

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
  useEffect(() => {
    if (notification && !notification.isRead) {
      dispatch(readNotification(notification.id));
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(readNotification(Number(id)));
    }
  }, []);

  return (
    <Layout>
      <div className="mt-24 mb-4">
        <div className="flex flex-col gap-4 p-4 rounded-md bg-[#FFFFFF] min-h-[80vh]">
          <p>
            When :
            {formatDate(notification.createdAt)}
          </p>

          <div>
            <p className="text-[13px] sm:text-[15px] md:text-[17px]">
              {notification.message}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationDetail;
