import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { Socket } from "socket.io-client";

import AppRoutes from "./routes/AppRoutes";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  connectToSocket,
  disconnectFromSocket,
  getSocket,
} from "./utils/socket";
import { getUserNotifications } from "./redux/reducers/notificationSlice";
import UpdatePasswordmod from "./components/password/updateModal";
import PasswordPopup from "./components/password/PasswordPopup";

const App: React.FC = () => {
  const [expired, setExpired] = React.useState(false);
  const [PasswordModal, setPasswordModal] = React.useState(false);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const initializeSocket = async () => {
      await connectToSocket();
    };

    initializeSocket();
    dispatch(getUserNotifications());

    return () => {
      disconnectFromSocket();
    };
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(getUserNotifications());
  }, [dispatch]);

  const { isPasswordExpired } = useAppSelector((state) => state.updatePin);

  return (
    <main>
      <AppRoutes />

      {isPasswordExpired && <PasswordPopup />}
    </main>
  );
};

export default App;
