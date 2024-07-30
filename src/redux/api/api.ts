import { toast } from "react-toastify";

import api from "./action";

let navigateFunction = null;
let isNotificationSent = false;
const redirectToLogin = (navigate) => {
  setTimeout(() => {
    navigate("/login");
  }, 2000);
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const excludeRoute = "/";
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const isSingleProductView = pathParts.length === 3
      && pathParts[1] === "products"
      && !Number.isNaN(Number(pathParts[2]));
    if (
      !isNotificationSent
      && error.response
      && error.response.status === 401
      && window.location.pathname !== excludeRoute
      && !isSingleProductView
    ) {
      isNotificationSent = true;
      if (navigateFunction) {
        toast("Login is Required for this action \n Redirecting to Login \n ");
        setTimeout(() => {
          redirectToLogin(navigateFunction);
        }, 2000);
      }
    }
    return Promise.reject(error);
  },
);
export default api;

export const setNavigate = (navigate) => {
  navigateFunction = navigate;
};
