import { Dialog, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PasswordPopup = () => {
  const [open, setOpen] = React.useState(true);
  const [PasswordModal, setPasswordModal] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      window.location.assign("/");
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (window.location.pathname.includes("/dashboard")) {
      window.location.href = "/";
    }
  };

  const { pathname } = window.location;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogContent>
        <p className=" text-center">
          Your Password has Expired kindly update Your password to continue
        </p>
        <div className=" flex items-center justify-center my-4">
          <Link
            to={`/update-password?target=${pathname}`}
            onClick={() => setOpen(false)}
            className="flex items-center text-center px-4 py-2 bg-red-500 rounded-md text-white"
          >
            Update Now
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordPopup;
