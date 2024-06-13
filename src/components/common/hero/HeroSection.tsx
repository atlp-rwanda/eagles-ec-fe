/* eslint-disable arrow-body-style */
import { Button, Stack } from "@mui/material";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center w-[90%] bg-[#E7BAC0] min-h-[300px] sm:min-h-[554px] h-full my-4 rounded-md relative mx-auto">
      <Stack className="text-center w-[500px]">
        <p className="sm:text-[48px] text-[30px] font-bold text-white">
          Your One-Stop
          {" "}
        </p>
        <p className="sm:text-[48px] text-[30px] font-bold text-white">
          Electronic Market
        </p>
        <p className="text-white">
          Welcome to eagles, a place where you can buy everything about
          electronics sale every day!
        </p>
        <Button>Get Started</Button>
      </Stack>
    </div>
  );
};

export default HeroSection;
