import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import isTokenExpired from "../../../utils/isTokenExpired";
import { useSessionExpired } from "../../../hooks/sessionExpiredOverlay";

const IsTokenExpired = ({ children }) => {
  const navigate = useNavigate();
  const { setShowOverlay } = useSessionExpired();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (isTokenExpired(token)) {
      setShowOverlay(true);
    }
  }, [navigate, token, setShowOverlay]);

  return children;
};

export default IsTokenExpired;
