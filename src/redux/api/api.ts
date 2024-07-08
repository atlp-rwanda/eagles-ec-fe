import axios from "axios";

import store from "../store";
import { setNetworkError } from "../reducers/NetworkErrorSlice";

const api = axios.create({
  baseURL: process.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
let navigateFunction = null;

export const setNavigateFunction = (navigate) => {
  navigateFunction = navigate;
};
const redirectToLogin = (navigate) => {
  setTimeout(() => {
    navigate("/login");
  }, 2000);
};

const redirectToLanding = (navigate) => {
  setTimeout(() => {
    navigate("/");
  }, 3000);
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // const navigate = useNavigate();
    if (error.response && error.response.status === 401) {
      if (navigateFunction) {
        redirectToLogin(navigateFunction);
      }
    } else if (!error.response) {
      store.dispatch(setNetworkError());
    }
    return Promise.reject(error);
  },
);

export default api;
