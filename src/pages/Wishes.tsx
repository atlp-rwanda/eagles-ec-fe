import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { MdOutlineClose } from "react-icons/md";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import Spinner from "../components/dashboard/Spinner";
import MainSpinner from "../components/common/auth/Loader";
import Warning from "../components/common/notify/Warning";
import { deleteWish, fetchWishes } from "../redux/reducers/wishListSlice";
import { RootState, AppDispatch } from "../redux/store";
import { addToCart } from "../redux/reducers/cartSlice";
import LinkToUpdatePage from "../components/profile/linkToUpdate";

// @ts-ignore
const BuyerWishesList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { wishes, error } = useSelector((state: RootState) => state.wishes);
  const [loadingWish, setLoadingWish] = useState<number | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const loggedInUserToken = localStorage.getItem("accessToken");
  let loggedInUser;
  if (loggedInUserToken) {
    // @ts-ignore
    loggedInUser = JSON.parse(atob(loggedInUserToken.split(".")[1]));
  }
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        await dispatch(fetchWishes());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  const handleDeleteWish = async (productId) => {
    setLoadingWish(productId);
    try {
      const response = await dispatch(deleteWish({ productId }));
      dispatch(fetchWishes());
      toast.success("Wish removed from the list");
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);
    } finally {
      setLoadingWish(null);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!localStorage.getItem("accessToken")) {
      toast.info("Please Log in to add to cart.");
      return;
    }
    setLoadingWish(productId);
    try {
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
      await dispatch(deleteWish({ productId }));
      dispatch(fetchWishes());
      toast.success("Products add to cart.");
    } catch (err) {
      const error = err as AxiosError;
      toast.error(`Failed to add product to cart: ${error.message}`);
    } finally {
      setLoadingWish(null);
    }
  };
  if (isLoading) {
    return (
      <p>
        <MainSpinner />
      </p>
    );
  }

  return (
    <div className="w-full px-[2%] md:px-[4%]">
      <ToastContainer />
      <div className="pt-8">
        <h2>
          <LinkToUpdatePage link="/">
            <span className="hover:text-[#DB4444]">Home </span>
          </LinkToUpdatePage>
          / Wishes
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full my-4 overflow-x-auto">
          <thead className="mt-7">
            {wishes.length === 0 ? (
              ""
            ) : (
              <tr className="text-right mt-6 shadow-sm py-6">
                <th className="text-left pr-6">Product</th>
                <th className="text-left">Price</th>
                <th className="text-center pr-6">Stock Quantity</th>
                <th className="text-right pr-16">Actions</th>
              </tr>
            )}
          </thead>
          <tbody className="mt-5">
            {wishes.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No wishes found 😎
                </td>
              </tr>
            ) : (
              wishes.map((wish: any) => (
                <tr
                  key={wish.id}
                  className="relative mt-4 shadow-sm hover:border group"
                >
                  <td className="text-left py-3">
                    <div className="flex items-center">
                      {loadingWish === wish.productId && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                          <Spinner />
                        </div>
                      )}
                      <div
                        className="absolute -top-1 bg-red-500 p-1 rounded-full left-[-1px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteWish(wish.productId)}
                      >
                        <MdOutlineClose className="text-white" />
                      </div>
                      <img
                        data-testId="img-cart"
                        className="w-12"
                        src={wish.product?.images[0]}
                        alt={wish.product?.name}
                      />
                      <span className="mx-2 hidden md:block text-[9px] md:text-normal">
                        {wish.product?.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-left text-[14px] md:text-normal pr-4">
                    <h2 data-testId="price-cart">
                      RWF
                      {wish.product?.price}
                    </h2>
                  </td>
                  <td className="text-center text-[14px] md:text-normal pr-4">
                    <h2 data-testId="price-cart">
                      {wish.product?.stockQuantity}
                    </h2>
                  </td>
                  <td className="text-right text-[14px] md:text-normal pr-4">
                    <button
                      type="button"
                      className="bg-[#DB4444] text-white p-2 rounded-md"
                      onClick={() => handleAddToCart(wish.productId)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerWishesList;
