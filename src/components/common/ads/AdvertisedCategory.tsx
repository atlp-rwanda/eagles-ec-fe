import { Button, Stack, Typography } from "@mui/material";

const AdvertisedCategory = () => (
  <Stack
    direction={{ xs: "column", sm: "column", md: "row" }}
    justifyContent={{ xs: "center", sm: "center", md: "space-between" }}
    className="bg-gray-900 text-white p-10 rounded-lg shadow-lg"
    gap={4}
    data-testid="advertised-category"
  >
    <Stack
      width={{ xs: "100%", sm: "100%", md: "50%" }}
      alignItems={{ xs: "center", md: "flex-start" }}
      textAlign={{ xs: "center", md: "left" }}
    >
      <p className="text-red-400">Categories</p>
      <Typography
        variant="h2"
        className="py-8 sm:text-[48px]"
        display={{ xs: "none", sm: "none", md: "flex" }}
      >
        Enhance Your
        {' '}
        <br className="hidden md:block" />
        {' '}
        Music Experience
      </Typography>
      <Typography
        display={{ xs: "flex", sm: "flex", md: "none" }}
        className="py-8"
      >
        Enhance Your
        {' '}
        <br className="hidden md:block" />
        {' '}
        Music Experiences
      </Typography>
      <div className="my-5 flex gap-2 justify-center md:justify-start">
        <div className="flex items-center flex-col justify-center h-[62px] w-[62px] bg-white px-4 py-2 rounded-full">
          <span className="text-xl text-[#000000] font-bold">23</span>
          <span className="text-[11px] text-[#8D8D8D]">Hours</span>
        </div>
        <div className="flex items-center flex-col justify-center h-[62px] w-[62px] bg-white px-4 py-2 rounded-full">
          <span className="text-xl text-[#000000] font-bold">05</span>
          <span className="text-[11px] text-[#8D8D8D]">Days</span>
        </div>
        <div className="flex items-center flex-col justify-center h-[62px] w-[62px] bg-white px-4 py-2 rounded-full">
          <span className="text-xl text-[#000000] font-bold">59</span>
          <span className="text-[11px] text-[#8D8D8D]">Minutes</span>
        </div>
        <div className="flex items-center flex-col justify-center h-[62px] w-[62px] bg-white px-4 py-2 rounded-full">
          <span className="text-xl text-[#000000] font-bold">35</span>
          <span className="text-[11px] text-[#8D8D8D]">Seconds</span>
        </div>
      </div>
      <Button
        variant="contained"
        color="error"
        sx={{ paddingY: "15px", width: "200px" }}
        data-testid="buy-now-button"
      >
        Buy Now!
      </Button>
    </Stack>
    <Stack
      width={{ xs: "100%", sm: "100%", md: "50%" }}
      display={{ xs: "none", md: "flex" }}
      justifyContent="center"
      alignItems="center"
    >
      <img
        src="/images/jbl.png"
        className="w-full h-auto"
        alt="this is alt to skip eslint hhhh"
      />
    </Stack>
  </Stack>
);

export default AdvertisedCategory;
