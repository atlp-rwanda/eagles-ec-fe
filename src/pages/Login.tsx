import { FcGoogle } from "react-icons/fc";
import { FaCircle } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";

import loginSchema from "../schemas/loginSchema";
import Button from "../components/common/auth/Button";
import InputField from "../components/common/auth/InputField";
import { RootState } from "../redux/store";
import { login } from "../redux/api/loginApiSlice";
import sideImage from "../assets/sideImage.png";
import LinkPages from "../components/common/auth/LinkPages";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.login.loading);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      // @ts-ignore
      const result = await dispatch(login(data)).unwrap();
      toast.success("You're logged in!");
      const { token } = result;
      localStorage.setItem("accessToken", token);
      reset();
      const sellerOtp = JSON.parse(atob(token.split(".")[1])).otp;
      if (sellerOtp) {
        navigate("/2fa-verify");
      } else {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      const error = err as AxiosError;
      toast.error(`Login failed: ${error.message}`);
      console.log(err);
    }
  };

  return (
    <div className="w-full max-h-[100vh] overflow-y-hidden flex">
      <ToastContainer />
      <div className="hidden min-h-screen lg:flex w-[60%] xl:w-[60%] items-center">
        <img className="w-full" src={sideImage} alt="registerImage" />
      </div>
      <div className="w-[100%] md:w-[50%] xl:w-[40%] flex flex-col justify-center mt-[15vh] mx-auto px-16">
        <div className="text-black font-bold text-[30px] flex items-center gap-1">
          <h1 className="font-medium text-[36px]">
            Login to
            <span className="font-[550] text-heading"> eagles</span>
          </h1>
          <FaCircle className="text-sm text-[#DB4444] mt-3" />
        </div>
        <h5 className="text-left font-normal text-[16px] pt-6">
          Enter your details below
        </h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            type="text"
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
          <Link
            to="/reset-password"
            className="text-blue-500 font-normal text-normal"
          >
            Forgot Password?
          </Link>
          <div className="flex flex-col">
            <Button
              text={loading ? "Loading..." : "Login"}
              disabled={loading}
              data-testid="login-btn"
            />
            <button
              type="button"
              className="border flex items-center font-normal justify-center py-2.5 text-[16px] rounded-sm"
            >
              <FcGoogle className="mr-3 text-2xl" />
              Sign in with Google
            </button>
          </div>
        </form>
        <LinkPages
          description="Don't have an account?"
          link="/register"
          text="Sign Up"
        />
      </div>
    </div>
  );
};

export default Login;
