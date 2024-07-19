import { IconButton, Rating, Typography } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

import {
  addWish,
  fetchWishes,
  deleteWish,
} from "../../redux/reducers/wishListSlice";
import { IProduct } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import {
  addToCart,
  cartManage,
  removeFromCart,
} from "../../redux/reducers/cartSlice";
import Warning from "../common/notify/Warning";
import { RootState } from "../../redux/store";
import { RegisterError, Review } from "../../../type";
import api from "../../redux/api/api";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadWishes, setLoadWishes] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { wishes } = useSelector((state: RootState) => state.wishes);
  const dispatch = useAppDispatch();

  const formatPrice = (price: number) => {
    if (price < 1000) {
      return price.toString();
    }
    if (price >= 1000 && price < 1000000) {
      return `${(price / 1000).toFixed(1)}k`;
    }
    return `${(price / 1000000).toFixed(1)}M`;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/products/${product.id}/reviews`);
        if (!response) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.data;
        setReviews(data.reviewProduct);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [product.id]);

  useEffect(() => {
    setLoadWishes(true);
    const fetchData = async () => {
      try {
        await dispatch(fetchWishes());
        setLoadWishes(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);
  const total = reviews
    ? reviews.reduce((sum, review) => sum + (review.rating, 10), 0)
      / reviews.length
    : 0;

  const handleRemove = async (productId: number) => {
    try {
      // @ts-ignore
      await dispatch(removeFromCart(productId));
      dispatch(cartManage());
    } catch (err) {
      const error = err as AxiosError<RegisterError>;
      toast.error(`${error.message}`);
    }
  };
  const loading = useSelector(
    (state: RootState) => state.cart.remove.isLoading,
  );
  const userCart = useSelector((state: RootState) => state.cart.data);

  const alreadyInCart = userCart?.some(
    (item) =>
      // @ts-ignore
      item.product?.id === product.id,
  );
  const alreadyWished = wishes?.some((item) => item.product?.id === product.id);

  const handleAddToCart = async () => {
    if (!localStorage.getItem("accessToken")) {
      toast.info("Please Log in to add to cart.");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(
        addToCart({ productId: product.id, quantity: 1 }),
      ).unwrap();
      dispatch(cartManage());
    } catch (err) {
      const error = err as AxiosError;
      toast.error(`Failed to add product to cart: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWish = async () => {
    try {
      setLoadWishes(true);
      if (product.id) {
        const response = await dispatch(addWish({ productId: product.id }));
        if (response.payload === "product already exists in your wishlist") {
          handleDeleteWish();
          setLoadWishes(false);
          await dispatch(fetchWishes());
        } else {
          await dispatch(fetchWishes());
          setLoadWishes(false);
        }
      }
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);
    }
  };

  const handleDeleteWish = async () => {
    try {
      setLoadWishes(true);
      if (product.id) {
        dispatch(deleteWish({ productId: product.id }));
        await dispatch(fetchWishes());
        setLoadWishes(false);
      }
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);
    }
  };

  const name = product.name.length > 20
    ? `${product.name.substring(0, 12)}...`
    : product.name;

  const date = new Date(product.createdAt).getDate();
  const currentDate = new Date().getDate();

  const diff = currentDate - date;
  return (
    <div className="max-h-[270px] bg-[#F5F5F5] mb-2 relative" data-testid="tbt">
      {diff < 2 && (
        <div className="absolute top-2 left-2 " data-testid="new">
          {/* <p className=" rounded-md z-40  text-white new-product ">New</p> */}
          {diff}
        </div>
      )}
      <ToastContainer />
      <div
        className="relative min-h-[200px]"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={product.images[0]}
          alt="product"
          className="w-[100%] h-[200px] hover:scale-[1.05] transition duration-200"
          data-testid="prod-image"
        />
        {isHovered && (
          <div className="">
            {!alreadyInCart ? (
              <button
                className="bg-black text-white w-full py-2 text-center absolute bottom-0"
                data-testid="add-to-cart"
                onClick={handleAddToCart}
              >
                {isLoading ? "Adding..." : "Add To Cart"}
              </button>
            ) : (
              <button
                className="bg-red-500 text-white w-full py-2 text-center absolute bottom-0"
                onClick={() => handleRemove(product.id)}
              >
                {loading ? "Loading" : "Remove Cart"}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="absolute top-0 right-0 p-0">
        <div className="w-full flex flex-col gap-0">
          <IconButton
            className="bg-white"
            sx={{ paddingY: 0.5, paddingX: 0.5 }}
          >
            {!localStorage.getItem("accessToken") ? (
              ""
            ) : loadWishes ? (
              <Spinner color="pink" aria-label="Pink spinner example" />
            ) : alreadyWished ? (
              <CiHeart
                className="text-white bg-[#DB4444] p-2 rounded-full text-[30px]"
                data-testid="like-btn"
                onClick={handleAddWish}
              />
            ) : (
              <CiHeart
                className="text-black bg-white p-2 rounded-full text-[30px]"
                data-testid="like-btn"
                onClick={handleAddWish}
              />
            )}
          </IconButton>
          <IconButton
            sx={{ paddingY: 0.5, paddingX: 0.5 }}
            data-testid="dprod-detailbtn"
          >
            <Link to={`/products/${product.id}`}>
              <FaEye className="text-black bg-white p-2 rounded-full text-[30px]" />
            </Link>
          </IconButton>
        </div>
      </div>

      <Typography
        className="font-bold text-[14px] sm:text-[18px] text-nowrap p-1"
        data-testid="product-name"
      >
        {name}
      </Typography>
      <div className="flex items-center gap-1 p-1">
        <p className="text-red-400 text-[10px]" data-testid="price">
          $
          {formatPrice(product.price)}
        </p>
        <Rating
          value={total}
          color="orange"
          disabled
          size="small"
          data-testid="rating"
        />
        <p className="text-[10px]" data-testid="review">
          (
          {reviews ? reviews.length : 0}
          )
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
