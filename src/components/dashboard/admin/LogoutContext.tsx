import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

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
