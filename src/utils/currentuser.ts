import api from "../redux/api/api";

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return null;
  }
};
