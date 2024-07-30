import React, { useState } from "react";

const LogoutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="p-6 bg-white rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl">Confirm Logout</h2>
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="flex items-center px-4 py-2 text-white bg-red-500 rounded"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
