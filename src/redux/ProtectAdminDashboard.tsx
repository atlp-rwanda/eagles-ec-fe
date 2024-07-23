import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

import { performLogout } from "../utils/logoutUtils";

interface ProtectAdminDashboardProps {
  children: JSX.Element;
}

const ProtectAdminDashboard: React.FC<ProtectAdminDashboardProps> = ({
  children,
}) => {
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
        console.log(isExpired);
        // @ts-ignore
        if (!decodedToken || isTokenExpired || decodedToken.roleId !== 3) {
          if (isTokenExpired) {
            await performLogout();
          }
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        await performLogout();
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

export default ProtectAdminDashboard;
