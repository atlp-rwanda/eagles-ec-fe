import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { isExpired } from "react-jwt";

import { performLogout } from "../../../utils/logoutUtils";

import LogoutModal from "./LogoutModal";

interface LogoutContextType {
  openLogoutModal: () => void;
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

export const useLogout = () => {
  const context = useContext(LogoutContext);
  if (!context) {
    throw new Error("useLogout must be used within a LogoutProvider");
  }
  return context;
};

export const LogoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLogoutModal = () => {
    setIsModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await performLogout();
    closeLogoutModal();
  };

  const value = useMemo(() => ({ openLogoutModal }), []);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const accessToken: any = localStorage.getItem("accessToken");
      if (accessToken && isExpired(accessToken)) {
        try {
          localStorage.removeItem("accessToken");
          // eslint-disable-next-line no-restricted-globals
          window.location.href = "/";
        } catch (error) {
          console.error("Failed to logout:", error);
        }
      }
    };

    checkTokenExpiration();
  }, []);

  return (
    <LogoutContext.Provider value={value}>
      {children}
      <LogoutModal
        isOpen={isModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleLogout}
      />
    </LogoutContext.Provider>
  );
};
