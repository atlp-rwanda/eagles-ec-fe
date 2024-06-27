import PropTypes from "prop-types";
import { FcGoogle } from "react-icons/fc";

interface GoogleAuthLinkProps {
  baseUrl?: string;
}

export const GoogleAuthLink = ({ baseUrl }: GoogleAuthLinkProps) => {
  const finalBaseUrl = baseUrl || "";

  return (
    <a
      href={`${finalBaseUrl}/users/auth/google`}
      className="border flex items-center font-normal justify-center py-2.5 text-[16px] rounded-sm w-full"
    >
      <FcGoogle className="mr-3 text-2xl" />
      Sign in with Google
    </a>
  );
};

GoogleAuthLink.propTypes = {
  baseUrl: PropTypes.string,
};
