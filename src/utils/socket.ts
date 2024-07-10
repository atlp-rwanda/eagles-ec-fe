import { Socket, io } from "socket.io-client";

import store from "../redux/store";
import {
  onIncomingNotification,
  setNotifications,
} from "../redux/reducers/notificationSlice";
import { setPasswordExpired } from "../redux/reducers/updatePasswordSlice";

import { getCurrentUser } from "./currentuser";

let socket: Socket | undefined;

export const connectToSocket = async () => {
  if (!socket) {
    socket = io("https://eagles-ec-be-development.onrender.com", {
      autoConnect: true,
    });

    socket.on("connect", () => {
      //   alert("CONNECTED TO THE SERVER");
    });

    const user = await getCurrentUser();
    if (user && user.id !== null) {
      socket.emit("joinRoom", `${user.id}`);
    }
    socket.emit("joinRoom", `30`);

    socket.on("notification", (notification) => {
      store.dispatch(onIncomingNotification(notification));
    });
    socket.on("notifications", (notifications) => {
      store.dispatch(setNotifications(notifications));
    });
    socket.on("password expired", (notification) => {
      store.dispatch(setPasswordExpired(true));
    });
  }
};

export const disconnectFromSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = undefined;
  }
};

export const getSocket = (): Socket | undefined => socket;
