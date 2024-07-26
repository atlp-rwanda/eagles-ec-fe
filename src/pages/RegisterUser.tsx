import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { createUser } from "../redux/reducers/registerSlice";
import RegisterSchema from "../schemas/RegisterSchema";
import registerPhoto from "../assets/registerPhoto.png";
import { RegisterError, UserData } from "../../type";
import { RootState } from "../redux/store";
import InputField from "../components/common/auth/InputField";
import LinkPages from "../components/common/auth/LinkPages";
import { GoogleAuthLink } from "../components/common/auth/GoogleAuthLink";

const RegisterUser = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.register.isLoading);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<UserData> = async (data: UserData) => {
    try {
      // @ts-ignore
      await dispatch(createUser(data)).unwrap();
      toast.success(
        "Account created successfully, check your inbox to verify!",
      );
      reset();
    } catch (err) {
      const error = err as AxiosError<RegisterError>;
      toast.error(`Registration failed: ${error.message}`);
    }
  };
  return (
    <div className="flex w-full max-h-screen overflow-y-hidden">
      <div className="hidden min-h-screen lg:flex w-[60%] xl:w-[60%] items-center">
        <img className="w-full" src={registerPhoto} alt="registerImage" />
      </div>
      <div className="w-[100%] md:w-[50%] xl:w-[40%] flex flex-col justify-center mt-[15vh] mx-auto px-16">
        <h1 className="text-black font-medium text-[36px]">
          Create an account
        </h1>
        <h5 className="pt-6 text-left">Enter your details below</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="name"
            type="name"
            placeholder="Name"
            register={register}
            error={errors.name?.message}
          />
          <InputField
            name="username"
            type="username"
            placeholder="Username"
            register={register}
            error={errors.username?.message}
          />
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            error={errors.email?.message}
          />
          <InputField
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password?.message}
          />
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-[#161616] text-white py-3 my-4 text-[13px] md:text-lg rounded-sm"
            >
              {loading ? "Loading..." : "Create Account"}
            </button>
            <GoogleAuthLink baseUrl={process.env.VITE_BASE_URL} />
          </div>
        </form>
        <LinkPages
          description="Already have an account?"
          link="/login"
          text="Login"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterUser;
