import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import PasswordUpdateForm from "../components/password/passwordUpdate";
import { RootState } from "../redux/store";
import { updatePassword } from "../redux/api/updatePasswordApiSlice";
import Button from "../components/common/auth/Button";

Modal.setAppElement("#root"); // replace "#root" with the id of your app's root element

const UpdatePasswordPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.password.loading);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = async (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      // @ts-ignore
      const result = await dispatch(updatePassword(data)).unwrap();
      const { message } = result;
      toast.success(message);
      closeModal();
    } catch (error) {
      toast.error("Failed to update password.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ToastContainer />
      <Button
        onClick={openModal}
        className="bg-[#DB4444] text-white py-3 px-2 my-4 text-normal md:text-lg rounded-sm"
        text="Update Password"
      />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="">
        <div className="flex justify-center">
          <h1 className="absolute  top-8 font-bold text-[#DB4444]">
            Update Your Password
          </h1>
        </div>
        <div className="mt-16">
          <PasswordUpdateForm
            onCancel={closeModal}
            onSubmit={onSubmit}
            loading={loading}
          />
        </div>
        <div className="flex justify-center">
          <p className="absolute bottom-6 text-sm flex justify-center items-center">
            For your own Security we recommend you to have a &nbsp;
            <span className="font-bold">strong Password</span>
            {' '}
&nbsp;!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default UpdatePasswordPage;
