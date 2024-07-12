import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import Spinner from "../components/common/auth/Loader";
import { RootState } from "../redux/store";
import { verifyUser } from "../redux/reducers/registerSlice";

const SignupVerification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const { isLoading, verified } = useSelector(
    (state: RootState) => state.register,
  );

  useEffect(() => {
    if (token) {
      // @ts-ignore
      dispatch(verifyUser(token));
    }
  }, [dispatch, token]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100 md:m-0 px-4">
      <div className="bg-white p-6 rounded shadow-md text-center">
        {!verified ? (
          <>
            <h1 className="text-2xl font-medium text-green-500">
              User Already Verified!
            </h1>
            <p className="mt-4">
              Your email address is already verified. You can log in to your
              account.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-medium text-red-500">
              Email Verified!
            </h1>
            <p className="mt-4">
              Thank you for verifying your email address. Your registration is
              now complete.
            </p>
            <p className="mt-2">
              You can now log in to your account and start using our services.
            </p>
          </>
        )}
        <Link to="/login">
          <button className="mt-4 inline-block px-4 py-2 text-white bg-red-500 rounded transition-colors duration-300 cursor-pointer hover:bg-green-600">
            Go to Login
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SignupVerification;
