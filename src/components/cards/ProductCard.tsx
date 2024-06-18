import { IconButton, Rating, Typography } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IProduct } from "../../types";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const price = product.price >= 100000
    ? `${(product.price / 1000000).toFixed(1)}M`
    : product.price >= 1000
      ? `${(product.price / 1000).toFixed(1)}k`
      : product.price.toString();

  const name = product.name.length > 20
    ? `${product.name.substring(0, 12)}...`
    : product.name;

  return (
    <div
      className=" min-h-[200px] p-3 bg-[#F5F5F5] mb-2 relative"
      data-testid="tbt"
    >
      <div
        className=" relative min-h-[200px]"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={product.images[0]}
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
        <div className=" w-full flex flex-col items-center justify-center">
          <IconButton className="bg-white">
            <CiHeart className="text-black bg-white p-2 rounded-full text-[30px]" />
          </IconButton>
          <IconButton>
            <Link to={`/products/${product.id}`}>
              {" "}
              <FaEye className="text-black bg-white p-2 rounded-full text-[30px]" />
            </Link>
          </IconButton>
        </div>
      </div>

      <Typography className="font-bold text-[14px] sm:text-[18px] text-nowrap">
        {name}
      </Typography>
      <div className="flex items-center gap-1">
        <p className="text-red-400 text-[10px]">
          $
          {price}
        </p>
        <Rating value={4} color="orange" disabled size="small" />
        <p className="text-[10px]">(56)</p>
      </div>
    </div>
  );
};

export default ProductCard;
