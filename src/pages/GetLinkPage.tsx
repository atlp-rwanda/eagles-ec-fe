import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";

import InputField from "../components/common/auth/InputField";
import { emailSchema } from "../schemas/PasswordResetSchema";
import Button from "../components/common/auth/Button";
import { RegisterError, emailType } from "../../type";
import { RootState } from "../redux/store";
import { getLink } from "../redux/reducers/getLinkSlice";
import Logo from "../components/common/auth/Logo";

const GetLinkPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.getLink.isLoading);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<emailType>({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit: SubmitHandler<emailType> = async (data: emailType) => {
    try {
      // @ts-ignore
      await dispatch(getLink(data)).unwrap();
      toast.success("Email sent successfully check your inbox!");
      reset();
    } catch (err) {
      const error = err as AxiosError<RegisterError>;
      toast.error(`${error.message}`);
    }
  };
  return (
    <div className="w-full h-screen overflow-y-hidden">
      <ToastContainer />
      <Logo className="p-5" />
      <div className=" w-[75%] md:w-1/2 flex mx-auto flex-col mt-36">
        <h1 className="text-[#EB5757]  text-[15px] sm:text-2xl md:text-[38px] text-center">
          Get a link to reset password
        </h1>
        <p className="text-[13px] md:text-[16px] text-center pt-6">
          To reset your password provide registered email below. Before proceed
          make sure you provide valid email.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[100%] md:w-[70%] mx-auto mt-8"
        >
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            error={errors.email?.message}
          />
          <div className="flex justify-center">
            <Button
              text={loading ? "Loading..." : "Send Link"}
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
