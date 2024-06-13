import { IconButton, Rating, Typography } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";

const ProductCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className=" min-h-[200px] p-3 bg-[#F5F5F5] mb-2 relative">
      <div
        className=" relative min-h-[200px]"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/prod.png"
          alt="d"
          className="w-[100%] max-h-full hover:scale-[1.05] transition duration-200"
        />
        {isHovered && (
          <button className="bg-black text-white w-full py-2 text-center rounded-md absolute bottom-0 ">
            add to cart
          </button>
        )}
      </div>

      <div className=" absolute top-0 right-0 p-0 ">
        <div className=" w-full flex flex-col items-center justify-center gap-1">
          <IconButton className="bg-white">
            <CiHeart className="text-black bg-white p-2 rounded-full text-[30px]" />
          </IconButton>
          <IconButton>
            <FaEye className="text-black bg-white p-2 rounded-full text-[30px]" />
          </IconButton>
        </div>
      </div>

      <Typography className="font-bold text-[14px] sm:text-[18px] text-nowrap">
        Breed Dry Dog Food
      </Typography>
      <div className="flex items-center gap-1">
        <p className="text-red-400 text-[10px]">$100</p>
        <Rating value={4} color="orange" disabled size="small" />
        <p className="text-[10px]">(56)</p>
      </div>
    </div>
  );
};

export default ProductCard;
