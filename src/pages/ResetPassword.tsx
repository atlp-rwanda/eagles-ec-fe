import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";

import { resetPassword } from "../redux/reducers/resetPasswordSlice";
import { ResetError, passwordType } from "../../type";
import Button from "../components/common/auth/Button";
import InputField from "../components/common/auth/InputField";
import { RootState } from "../redux/store";
import { resetPasswordSchema } from "../schemas/PasswordResetSchema";
import Logo from "../components/common/auth/Logo";

const GetLinkPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.reset.isLoading);
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const onSubmit: SubmitHandler<passwordType> = async (data: passwordType) => {
    if (!token) {
      toast.error("Token is missing!");
      return;
    }
    const requestData = {
      ...data,
      token,
    };
    console.log(requestData);
    console.log(token);
    try {
      // @ts-ignore
      await dispatch(resetPassword(requestData)).unwrap();
      toast.success("Your password has been updated!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      reset();
    } catch (err) {
      const error = err as AxiosError<ResetError>;
      toast.error(`${error.message}`);
    }
  };
  return (
    <div className="w-full h-screen overflow-y-hidden">
      <ToastContainer />
      <Logo className="p-5" />
      <div className=" w-[75%] md:w-[35.5%] flex mx-auto flex-col mt-12 items-center md:mt-24">
        <h1 className="text-[#EB5757]  text-[15px] sm:text-2xl md:text-[38px] text-center">
          Reset your password
        </h1>
        <p className="text-[13px] md:text-[16px] text-center pt-6">
          Before you write your password consider if your password is strong
          enough that can not be guessed or cracked by anyone.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[100%] md:w-[70%] mx-auto mt-8"
        >
          <InputField
            name="password"
            type="password"
            placeholder="New Password"
            register={register}
            error={errors.password?.message}
          />
          <InputField
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            register={register}
            data-testid="confirm-password"
            error={errors.confirmPassword?.message}
          />
          <div className="flex justify-center">
            <Button
              text={loading ? "Loading..." : "Reset"}
              backgroundColor="bg-[#EB5757]"
              disabled={loading}
              data-testid="sent-link-btn"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetLinkPage;
