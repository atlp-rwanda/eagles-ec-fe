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

  const date = new Date(product.createdAt).getDate();
  const currrentDate = new Date().getDate();

  const diff = currrentDate - date;

  return (
    <div
      className=" max-h-[270px] bg-[#F5F5F5] mb-2 relative"
      data-testid="tbt"
    >
      {diff < 2 && (
        <div className="absolute top-2 left-2 ">
          <p className=" rounded-md z-40  text-white new-product ">New</p>
        </div>
      )}

      <div
        className=" relative min-h-[200px]"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={product.images[0]}
          alt="d-ss"
          className="w-[100%] h-[200px] hover:scale-[1.05] transition duration-200"
        />
        {isHovered && (
          <button className="bg-black text-white w-full py-2 text-center absolute bottom-0 ">
            Add to cart
          </button>
        )}
      </div>

      <div className=" absolute top-0 right-0 p-0 ">
        <div className=" w-full flex flex-col gap-0 ">
          <IconButton
            className="bg-white"
            sx={{ paddingY: 0.5, paddingX: 0.5 }}
          >
            <CiHeart className="text-black bg-white p-2 rounded-full text-[30px]" />
          </IconButton>
          <IconButton sx={{ paddingY: 0.5, paddingX: 0.5 }}>
            <Link to={`/products/${product.id}`}>
              {" "}
              <FaEye className="text-black bg-white p-2 rounded-full text-[30px]" />
            </Link>
          </IconButton>
        </div>
      </div>

      <Typography className="font-bold text-[14px] sm:text-[18px] text-nowrap p-1">
        {name}
      </Typography>
      <div className="flex items-center gap-1 p-1">
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
