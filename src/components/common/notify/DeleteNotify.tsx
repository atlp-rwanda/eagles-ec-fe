import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteNotify = ({ onConfirm, onCancel }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpenModal(false);
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)}>Clear Cart</button>
      <Dialog
        className="mt-[13rem] md:mt-0"
        open={openModal}
        maxWidth="xs"
        onClose={() => setOpenModal(false)}
      >
        <DialogContent>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="error" onClick={handleConfirm}>
                Yes, I'm sure
              </Button>
              <Button
                onClick={() => {
                  setOpenModal(false);
                  onCancel();
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteNotify;
