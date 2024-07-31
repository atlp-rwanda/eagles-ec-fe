// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoChevronUpOutline, IoChevronDownSharp } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

import { RootState } from "../redux/store";
import {
  cartManage,
  increaseQuantity,
  decreaseQuantity,
  cartDelete,
  removeFromCart,
  updateCarts,
} from "../redux/reducers/cartSlice";
import Spinner from "../components/common/auth/Loader";
import Warning from "../components/common/notify/Warning";
import DeleteNotify from "../components/common/notify/DeleteNotify";
import { useAppDispatch } from "../redux/hooks";
import { RegisterError } from "../../type";

const CartManagement: React.FC<IProductCardProps> = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.cart.isLoading);
  const userCart = useSelector((state: RootState) => state.cart.data);
  const error = useSelector((state: RootState) => state.cart.error);
  const updateLoader = useSelector(
    (state: RootState) => state.cart.update.isLoading,
  );
  const [updatedQuantities, setUpdatedQuantities] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(cartManage());
    }
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }
  if (!localStorage.getItem("accessToken")) {
    return <Warning />;
  }
  if (error) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <h2>Error occurred during fetching 😎</h2>
      </div>
    );
  }

  const handleDelete = async () => {
    await dispatch(cartDelete());
    dispatch(cartManage());
  };

  const handleRemove = async (productId: string) => {
    try {
      await dispatch(removeFromCart(productId));
      dispatch(cartManage());
      toast.success("Product removed successfully");
    } catch (err) {
      const error = err as AxiosError<RegisterError>;
      toast.error(`${error.message}`);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatePromises = Object.entries(updatedQuantities).map(
        ([productId, quantity]) =>
          dispatch(updateCarts({ productId: Number(productId), quantity })),
      );

      await Promise.all(updatePromises);

      setUpdatedQuantities({});
      dispatch(cartManage());
    } catch (err) {
      const error = err as AxiosError<RegisterError>;
      toast.error(`${error.message}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
    const value = parseInt(e.target.value, 10);
    setUpdatedQuantities({
      ...updatedQuantities,
      [item.productId]: value,
    });
  };

  const total = userCart.reduce(
    (acc, item) => acc + item.product?.price * item.quantity,
    0,
  );

  const hasUpdates = Object.keys(updatedQuantities).length > 0;

  return (
    <div className="w-full px-[2%] md:px-[4%]">
      <ToastContainer />
      <div className="pt-8">
        <h2>Home / Carts</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full my-4 overflow-x-auto">
          <thead className="mt-7">
            {userCart.length === 0 ? (
              ""
            ) : (
              <tr className="text-right mt-6 shadow-sm py-6">
                <th className="text-left pr-6">Product</th>
                <th className="text-left">Price</th>
                <th className="text-left pr-6">Quantity</th>
                <th className="text-left">Subtotal</th>
              </tr>
            )}
          </thead>
          <tbody className="mt-5">
            {userCart.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No items in the cart 😎
                </td>
              </tr>
            ) : (
              userCart.map((item: any) => (
                <tr
                  key={item.id}
                  className="relative mt-4 shadow-sm hover:border group"
                >
                  <td className="text-left py-3">
                    <div className="flex items-center">
                      <div
                        className="absolute -top-1 bg-red-500 p-1 rounded-full left-[-1px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemove(item.productId)}
                      >
                        <MdOutlineClose className="text-white" />
                      </div>
                      <img
                        data-testId="img-cart"
                        className="w-12"
                        src={item.product?.images[0]}
                        alt={item.product?.name}
                      />
                      <span className="mx-2 hidden md:block text-[9px] md:text-normal">
                        {item.product?.name.length > 8
                          ? `${item.product?.name.slice(0, 8)}...`
                          : item.product?.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-left text-[14px] md:text-normal pr-4">
                    <h2 data-testId="price-cart">
                      RWF
                      {item.product?.price}
                    </h2>
                  </td>
                  <td className="text-left">
                    <div>
                      <input
                        type="number"
                        name="number"
                        min={1}
                        className="w-[60px] px-3 outline-none border border-gray-600"
                        value={
                          updatedQuantities[item.productId] ?? item.quantity
                        }
                        onChange={(e) => handleChange(e, item)}
                      />
                    </div>
                  </td>
                  <td className="text-left text-[14px] md:text-normal">
                    <h3>
                      RWF
                      {item.product?.price
                        * ((updatedQuantities[item.productId] ?? item.quantity)
                          || 0)}
                    </h3>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {userCart.length === 0 ? (
        ""
      ) : (
        <div className="flex text-center sm:flex-row justify-between items-center gap-3 mt-7">
          <div
            className="border border-gray-600 rounded-sm px-3 md:px-3 py-2 hover:border-[0.5px] text-[12px] hover:border-green-700 cursor-pointer transition-all"
            onClick={handleUpdate}
          >
            <button disabled={!hasUpdates}>
              {updateLoader ? "updating..." : "Update Cart"}
            </button>
          </div>
          <div className="border border-gray-600 rounded-sm px-6 md:px-6 py-2 hover:border-[1px] text-[12px] hover:border-red-600 cursor-pointer transition-all">
            <DeleteNotify onConfirm={handleDelete} onCancel={() => {}} />
          </div>
        </div>
      )}
      <div className="flex mb-6">
        {userCart.length === 0 ? (
          ""
        ) : (
          <div className="w-full sm:w-[50%] md:w-[38%] flex flex-col justify-center items-start border-2 border-gray-500 mt-9 rounded-sm p-4 hover:border-[1.5px]">
            <h2 className="text-lg font-semibold mb-4 text-left">Cart Total</h2>
            <div className="flex gap-10 justify-between w-full mb-2">
              <h1 data-testId="subtotal" className="text-left">
                Subtotal
              </h1>
              <span>
                RWF
                {total}
              </span>
            </div>
            <hr className="w-full border-t border-gray-300 mb-2" />
            <div className="flex gap-10 justify-between w-full mb-2 ext-[9px] md:text-normal">
              <h1 data-testId="shipping" className="text-left">
                Shipping
              </h1>
              <span>Free</span>
            </div>
            <hr className="w-full border-t border-gray-300 mb-2" />
            <div className="flex gap-10 justify-between w-full">
              <h1 data-testId="total" className="text-left">
                Total
              </h1>
              <span className="">
                RWF
                {total}
              </span>
            </div>
            <hr className="w-full border-t border-gray-300 mt-2" />
            <div className="bg-[#DB4444] text-white rounded-sm px-2 md:px-2 py-2 hover:border-[0.5px] mt-8 cursor-pointer mx-auto md:text-[14px]">
              <Link to="/payment">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartManagement;
