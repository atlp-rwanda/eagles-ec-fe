import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const SmoothScroll = ({ children }) => {
  const location = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);
  return <div>{children}</div>;
};
export default SmoothScroll;
