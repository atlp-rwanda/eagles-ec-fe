/* eslint-disable arrow-body-style */
import { Stack } from "@mui/material";

const HeroSection = () => {
  return (
    <div
      className="flex w-[96%] min-h-[300px] sm:min-h-[554px] h-full my-4 rounded-md relative mx-auto ss "
      data-testid="hero-section"
    >
      <Stack className="absolute left-[30px] top-1/2 transform -translate-y-1/2 space-y-2">
        <p className="sm:text-[48px] text-[30px] font-bold text-white">
          Your One-Stop
        </p>
        <p className="sm:text-[48px] text-[30px] font-bold text-white">
          Electronic Market
        </p>
        <p className="text-white">
          Welcome to eagles, a place where you can
          {' '}
          <br />
          {' '}
          buy everything about
          electronics sale every day!
        </p>
        <div
          className="bg-black px-4 py-2 rounded-md text-white w-[150px] text-center"
          data-testid="get-started-button"
        >
          Get Started
        </div>
      </Stack>
    </div>
  );
};

export default HeroSection;
