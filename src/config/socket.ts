import io, { Socket } from "socket.io-client";

const loggedUser: any = localStorage.getItem("userInfo");
const userId: number = JSON.parse(loggedUser)?.id;

export const socket = io(`${process.env.BASE_URL}`, {
  query: {
    userId,
  },
});
