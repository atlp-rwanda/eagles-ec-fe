import { IconButton, Rating, Skeleton } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import React from "react";
import { Link } from "react-router-dom";

interface SkeletonI {
  value: number;
}

const ProductCardSkelton: React.FC<SkeletonI> = ({ value }) => (
  <div
    className=" min-h-[200px] p-3 bg-[#F5F5F5] mb-2 relative"
    data-testid="product-card-skeleton"
  >
    <Skeleton
      className=" min-h-[200px] rounded-md"
      variant="rectangular"
      animation="wave"
    />

    <div className=" absolute top-0 right-0 p-0 ">
      <div className=" w-full flex flex-col items-center justify-center">
        <IconButton className="bg-white">
          <CiHeart className="text-black bg-white p-2 rounded-full text-[30px]" />
        </IconButton>
        <IconButton>
          {/* <Link to={`/products/123456`}> */}
          {" "}
          <FaEye className="text-black bg-white p-2 rounded-full text-[30px]" />
          {/* </Link> */}
        </IconButton>
      </div>
    </div>

    <Skeleton className="w-full min-h-[34px]" animation="wave" />
    <div className="flex items-center gap-1">
      <Skeleton
        className="text-red-400 text-[10px] w-[30px] min-h-[34px] flex-2"
        animation="wave"
      />
      <Rating value={value + 2} color="orange" disabled size="small" />
      <Skeleton className="text-[10px] min-h-[34px] flex-1" animation="wave" />
    </div>
  </div>
);

export default ProductCardSkelton;
