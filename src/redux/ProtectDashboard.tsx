import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

import { performLogout } from "../utils/logoutUtils";

interface ProtectDashboardProps {
  children: JSX.Element;
}

const ProtectDashboard: React.FC<ProtectDashboardProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setIsAuthorized(false);
        return;
      }

      try {
        const decodedToken = decodeToken(accessToken);
        const isTokenExpired = isExpired(accessToken);
        // @ts-ignore
        if (!decodedToken || isTokenExpired || decodedToken.roleId !== 2) {
          if (isTokenExpired) {
            await performLogout(); // Call the logout function
          }
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        await performLogout(); // Handle any errors by logging out
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectDashboard;
