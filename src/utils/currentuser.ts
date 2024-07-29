import api from "../redux/api/api";
import { ICurrentUser } from "../redux/reducers/notificationSlice";

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data as ICurrentUser;
  } catch (error: any) {
    return null;
  }
};
