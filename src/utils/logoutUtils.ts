import api from "../redux/api/api";

export const performLogout = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      await api.post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "*/*",
          },
        },
      );
      localStorage.removeItem("accessToken");
      // eslint-disable-next-line no-restricted-globals
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Failed to logout:", error);
  }
};
