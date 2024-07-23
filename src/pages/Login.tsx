import { FaCircle } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { decodeToken } from "react-jwt";
import { Stack } from "@mui/material";

import loginSchema from "../schemas/loginSchema";
import Button from "../components/common/auth/Button";
import InputField from "../components/common/auth/InputField";
import { RootState } from "../redux/store";
import { login } from "../redux/api/loginApiSlice";
import sideImage from "../assets/sideImage.png";
import LinkPages from "../components/common/auth/LinkPages";
import { GoogleAuthLink } from "../components/common/auth/GoogleAuthLink";
import { useAppDispatch } from "../redux/hooks";
import Logo from "../components/common/auth/Logo";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
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
      const decodedToken: any = decodeToken(token);
      if (decodedToken.roleId === 3) {
        navigate("/admin/dashboard");
      } else {
        const sellerOtp = JSON.parse(atob(token.split(".")[1])).otp;
        if (sellerOtp) {
          navigate("/2fa-verify");
        } else {
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    const getTokenFromUrl = () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      return params.token;
    };

    const token = getTokenFromUrl();

    if (token) {
      localStorage.setItem("accessToken", token);

      try {
        const decodedToken = decodeToken(token);
        // @ts-ignore
        const roleId = decodedToken?.roleId;

        if (roleId === 3) {
          navigate("/admin/dashboard");
        } else if (roleId === 2) {
          navigate("/dashboard");
        } else if (roleId === 1) {
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="w-full max-h-[100vh] overflow-y-hidden flex">
      <ToastContainer />
      <div className="hidden min-h-screen lg:flex w-[60%] xl:w-[60%] items-center">
        <img className="w-full" src={sideImage} alt="registerImage" />
      </div>
      <div className="w-full md:w-1/2 xl:w-2/5 flex flex-col justify-center mt-[15vh] mx-auto px-16">
        <div className="flex items-center gap-1 text-2xl font-bold text-black">
          <h1 className="flex items-center gap-1 text-2xl font-medium">
            Login to
            <Stack paddingY={{ xs: "12px" }}>
              <Logo className="" />
            </Stack>
          </h1>
        </div>
        <h5 className="pt-6 text-base font-normal text-left">
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
            to="/password-reset-link"
            className="font-normal text-blue-500 text-normal"
          >
            Forgot Password?
          </Link>
          <div className="flex flex-col mt-4">
            <Button
              text={loading ? "Loading..." : "Login"}
              backgroundColor="bg-[#161616]"
              disabled={loading}
              data-testid="login-btn"
            />
            <GoogleAuthLink baseUrl={process.env.VITE_BASE_URL} />
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
