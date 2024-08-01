import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";

import updatePasswordSchema from "../../schemas/updatePasswordSchema";
import { updatePassword } from "../../redux/api/updatePasswordApiSlice";
import PasswordInput from "../common/auth/password";

interface UpdatePasswordProps {
  setPasswordModal: (isOpen: boolean) => void;
  target?: string;
}

const UpdatePasswordmod: React.FC<UpdatePasswordProps> = ({
  setPasswordModal,
  target,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      // @ts-ignore
      const response = await dispatch(updatePassword(data)).unwrap();
      setLoading(false);
      toast.success(response.message);
      setTimeout(() => {
        setPasswordModal(false);
        window.location.href = target || "/";
      }, 2000);
    } catch (err) {
      setLoading(false);
      const error = err as AxiosError;
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#161616] bg-opacity-50">
      <div className="relative bg-white rounded-lg p-10 w-[90%] md:w-[65%] lg:w-[55%] xl:w-[50%] duration-75 animate-fadeIn">
        <ToastContainer />
        <h2 className="text-2xl mb-4 font-bold text-[#DB4444]">
          Update Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            id="oldPassword"
            placeholder="Old Password"
            register={register("oldPassword")}
            error={errors.oldPassword}
          />

          <PasswordInput
            id="newPassword"
            placeholder="New Password"
            register={register("newPassword")}
            error={errors.newPassword}
          />

          <div className="mb-4 relative">
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm Password"
              register={register("confirmPassword")}
              error={errors.confirmPassword}
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                // window.location.href = "/profile";
                setPasswordModal(false);
              }}
              className="bg-transparent text-primary border border-[#DB4444] px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#DB4444] text-white py-3 px-4 rounded "
            >
              {loading ? "Loading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordmod;
