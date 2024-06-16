import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";

import VerifyButton from "../components/common/auth/verifyButton";
import { verifyOtp } from "../redux/api/otpApiSclice";
import { RootState } from "../redux/store";

interface OtpFormInputs {
  digits: string[];
}

// @ts-ignore
const OtpVerificationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.otpVerification);
  const token = localStorage.getItem("accessToken");
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const focusNextInput = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onSubmit: SubmitHandler<OtpFormInputs> = async (data) => {
    try {
      const otp = parseInt(data.digits.join(""), 10);
      // @ts-expect-error
      const result = await dispatch(verifyOtp({ otp, token })).unwrap();
      toast.success("Verification successful");
      const verfiedToken = result.token;
      localStorage.setItem("accessToken", verfiedToken);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      const error = err as AxiosError;
      toast.error(
        `Verification failed: ${error.message}. Please try again with other OTP code.`,
      );
    }
  };

  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const targetValue = target.value;

    target.setSelectionRange(0, targetValue.length);

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    const previousBox = target.previousElementSibling as HTMLInputElement | null;
    if (previousBox) {
      previousBox.focus();
    }
  };
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    target.setSelectionRange(0, target.value.length);
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const paste = e.clipboardData.getData("text");
    if (paste.length === inputRefs.current.length) {
      e.preventDefault();
      paste.split("").forEach((char, i) => {
        setValue(`digits.${i}`, char);
        if (inputRefs.current[i]) {
          inputRefs.current[i]!.value = char;
        }
      });
      inputRefs.current[inputRefs.current.length - 1]?.focus();
    } else {
      const nextInputs = inputRefs.current.slice(index);
      e.preventDefault();
      paste.split("").forEach((char, i) => {
        const input = nextInputs[i];
        if (input) {
          setValue(`digits.${index + i}`, char);
          input.value = char;
        }
      });
      nextInputs[paste.length - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <div className="w-[100%] max-h-[100vh] min-h-[60vh] overflow-y-hidden">
        <div className="flex justify-center text-black text-[30px] gap-1">
          <h1 className="font-medium text-[36px] flex items-center ">
            <span className="font-[550] text-heading"> eagles</span>
            <FaCircle className="text-sm text-[#DB4444] mt-3" />
          </h1>
        </div>
        <p className="flex justify-center text-left font-normal text-[100%] pt-0 pb-6">
          verify your identity
        </p>
        <center>
          <div className="bg-gray-100 p-7 rounded-lg shadow-md max-w-[35rem]">
            <p className="flex justify-center text-center font-normal text-[100%] pt-0">
              Protecting your account is our priority. Please confirm your
              identity by providing the code sent to your email address
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center  mb-4 space-x-[4%] pt-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    type="text"
                    maxLength={1}
                    className="appearance-none w-[30%] h-[2.4rem] md:h-[4rem] border border-black bg-gray-100 rounded-md text-center text-xl focus:outline-none focus:border-[#DB4444]"
                    {...register(`digits.${index}`, {
                      required: `Enter 6 numbes sent on your email`,
                      // @ts-ignore
                      pattern: {
                        value: /^[0-9]{1}$/,
                        message: "Enter a valid digit (0-9)",
                      },
                    })}
                    data-testid={`digit-${index}`}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    onChange={(e) => {
                      setValue(`digits.${index}`, e.target.value);
                      focusNextInput(index);
                    }}
                    onKeyDown={inputKeyDown}
                    onFocus={inputOnFocus}
                    onPaste={(e) => handlePaste(e, index)}
                  />
                ))}
              </div>
              <div className="flex justify-center">
                {errors.digits && (
                  <p className="text-red-500 text-xs popins">
                    {Object.values(errors.digits)
                      .reduce((uniqueErrors, error) => {
                        // @ts-ignore
                        if (error && !uniqueErrors.includes(error.message)) {
                          // @ts-ignore
                          uniqueErrors.push(error.message);
                        }
                        return uniqueErrors;
                      }, [] as string[])
                      .join(". ")}
                  </p>
                )}
              </div>
              <div className="flex justify-center space-x-10">
                <button
                  type="button"
                  className="bg-gray-100 text-black border border-black py-1 my-4 text-[100%]  md:text-[100%] w-[50%] h-[2.5rem] rounded-[30px]"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Cancel
                </button>
                <VerifyButton
                  text={loading ? "Ver" : "Ver"}
                  textColor={loading ? "ifying..." : "ify"}
                  disabled={loading}
                  data-testid="login-btn"
                />
              </div>
            </form>
            <p className="text-center font-popin text-[16px] pt-6">
              It may take a minute to receive verification message.
            </p>
          </div>
        </center>
      </div>
    </div>
  );
};
export default OtpVerificationForm;
