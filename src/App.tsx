import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Socket } from "socket.io-client";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  connectToSocket,
  disconnectFromSocket,
  getSocket,
} from "./utils/socket";
import {
  getUserNotifications,
  handleCurrentUser,
} from "./redux/reducers/notificationSlice";
import UpdatePasswordmod from "./components/password/updateModal";
import PasswordPopup from "./components/password/PasswordPopup";

const App: React.FC = () => {
  const [expired, setExpired] = React.useState(false);
  const [PasswordModal, setPasswordModal] = React.useState(false);
  const location = useLocation();

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const initializeSocket = async () => {
      await connectToSocket();
    };

    initializeSocket();

    return () => {
      disconnectFromSocket();
    };
  }, [dispatch]);

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(handleCurrentUser());
      dispatch(getUserNotifications());
    }
  }, [dispatch]);

  const { isPasswordExpired } = useAppSelector((state) => state.updatePin);

  return (
    <main>
      <AppRoutes />

      {isPasswordExpired && <PasswordPopup />}
      {location.pathname !== "/chat"
        && location.pathname !== "/login"
        && location.pathname !== "/register" && (
          <div onClick={() => (window.location.href = "/chat")}>
            <div className="fixed bg-[#DB4444] text-white shadow-md rounded px-3 py-3 z-50 right-6 bottom-6 cursor-pointer group">
              <IoChatbubbleEllipsesOutline className="text-[30px] text-white" />
            </div>
          </div>
      )}
    </main>
  );
};

export default App;
