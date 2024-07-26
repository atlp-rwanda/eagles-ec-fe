/* eslint-disable arrow-body-style */
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      className="flex w-[98%] min-h-[300px] sm:min-h-[554px] h-full py-2 rounded-md relative mx-auto ss "
      data-testid="hero-section"
    >
      <div className="absolute left-[40px] top-1/2 transform -translate-y-1/2 space-y-4">
        <h1 className="sm:text-[48px] text-[30px] font-bold text-white md:max-w-[60%]">
          Your One-Stop Online Market
        </h1>
        <p className="text-white md:max-w-[60%] text-md">
          Welcome to eagles, a place where you can buy everything about
          electronics sale every day!
        </p>
        <Link to="/products" style={{ display: "inline-block" }}>
          <button
            data-testid="get-started-button"
            className="bg-[#161616] text-white rounded-[5px] px-3 py-2"
          >
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
