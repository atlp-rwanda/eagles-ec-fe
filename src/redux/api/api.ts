import { set } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import store from "../store";

import api from "./action";

let navigateFunction = null;

export const setNavigateFunction = (navigate) => {
  navigateFunction = navigate;
};
const redirectToLogin = (navigate) => {
  setTimeout(() => {
    navigate("/login");
  }, 2000);
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const excludeRoute = "/";

    if (
      error.response
      && error.response.status === 401
      && window.location.pathname !== excludeRoute
    ) {
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
