import { Divider, Skeleton, Stack } from "@mui/material";
import React from "react";

const ProductDetailSkleton = () => (
  <Stack className="p-4 mt-5" data-testid="product-details-skeleton">
    <Stack gap={2} direction={{ xs: "column", sm: "column", md: "row" }}>
      <Stack
        width={{ xs: "100%", sm: "100%", md: "60%" }}
        direction={{ xs: "column-reverse", sm: "column-reverse", md: "row" }}
        className="rounded-lg"
        gap={2}
      >
        <Stack direction={{ xs: "row", sm: "row", md: "column" }} gap={2}>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={100}
              height={130}
              animation="wave"
              className="rounded-md max-w-[170px] w-[80%] "
            />
          ))}
        </Stack>

        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          className="rounded-md"
          animation="wave"
        />
      </Stack>
      <Stack width={{ xs: "100%", sm: "100%", md: "40%" }} className="">
        <Stack gap={5} className="flex-1">
          <Stack gap={2}>
            <Skeleton variant="text" animation="wave" width={200} height={20} />
            <div className="flex items-center gap-3 h-[44px]">
              <Skeleton
                variant="text"
                animation="wave"
                width={100}
                height={20}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={50}
                height={20}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={50}
                height={20}
              />
            </div>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={35}
                height={20}
              />
            </Stack>
            <Skeleton variant="text" width="100%" height={20} />
          </Stack>
          <Divider />

          <div className="flex justify-between items-center">
            <Skeleton animation="wave" variant="text" width={150} height={20} />
            <Skeleton animation="wave" variant="text" width={160} height={20} />
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={20}
            />
          </div>

          <div className="rounded-md p-2">
            <div className="p-2 flex items-center gap-2">
              <Skeleton
                animation="wave"
                variant="circular"
                width={30}
                height={30}
              />
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={200}
                  height={20}
                />
              </div>
            </div>
            <Divider />
            <div className="p-2 flex items-center gap-2">
              <Skeleton
                animation="wave"
                variant="circular"
                width={30}
                height={30}
              />
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={200}
                  height={20}
                />
              </div>
            </div>
          </div>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
);

export default ProductDetailSkleton;
