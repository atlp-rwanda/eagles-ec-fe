import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

interface ProtectDashboardProps {
  children: JSX.Element;
}

const ProtectAdminDashboard: React.FC<ProtectDashboardProps> = ({
  children,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decodedToken = decodeToken(accessToken);
      const isTokenExpired = isExpired(accessToken);

      // @ts-ignore
      if (!decodedToken || isTokenExpired || decodedToken.roleId !== 3) {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectAdminDashboard;
