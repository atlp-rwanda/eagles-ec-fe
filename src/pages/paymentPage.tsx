import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { RootState } from "../redux/store";
import HeaderInfo from "../components/common/header/Info";
import Footer from "../components/common/footer/Footer";
import { useAppDispatch } from "../redux/hooks";
import { makePayment, handleSuccess } from "../redux/reducers/payment";
import { cartManage } from "../redux/reducers/cartSlice";
import Spinner from "../components/common/auth/Loader";

const Payment = () => {
  const loading = useSelector((state: RootState) => state.payment.loading);
  const userCart = useSelector((state: RootState) => state!.cart.data);
  const dispatch = useAppDispatch();
  const totalPrice = userCart.reduce((total, item) => total + item.price, 0);

  const handlePayment = () => {
    try {
      dispatch(makePayment({ totalPrice, userCart })).then((response) => {
        if (response.payload.sessionUrl) {
          toast(`${response.payload.message}\n Redirecting to stripe payment`);

          setTimeout(() => {
            window.location.href = response.payload.sessionUrl;
          }, 3000);
        } else {
          toast(response.payload.message);
        }
      });
    } catch (err) {
      toast.error("Failed to make payment");
    }
  };

  useEffect(() => {
    dispatch(cartManage());
  }, [dispatch]);

  const total = userCart.reduce(
    // @ts-ignore
    (acc, item) => acc + item.product?.price * item.quantity,
    0,
  );

  return (
    <div className="px-[2%] md:px-[4%] parent-container h-screen overflow-auto">
      <ToastContainer />
      <div className="pt-8">
        <h2>
          <Link to="/">Home</Link>
          {' '}
          /
          <Link to="/carts">Carts</Link>
          {' '}
          / payment
        </h2>
      </div>
      <div className="w-full sm:w-[50%] md:w-[38%] flex flex-col justify-center items-start mt-9 rounded-sm p-4 hover:border-[1.5px]">
        <h2 className="text-lg font-semibold mb-4 text-left">
          Checkout Details
        </h2>
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
              className="flex gap-10 justify-between w-full mb-2"
            >
              <td className="text-left py-3">
                <div className="flex items-center">
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
              <td className="text-left text-[14px]">
                <h2 data-testId="price-cart">
                  RWF
                  {item.product?.price}
                </h2>
              </td>
            </tr>
          ))
        )}
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
          <button onClick={handlePayment}>
            {loading ? "Processing..." : "Pay with Stripe"}
          </button>
        </div>
      </div>
      <div className="bg-gray-200 w-100% sm:w-[100%] h-[1px] mt-[0.1%]" />
    </div>
  );
};

const SuccessfulPayment = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");
    const userId = urlParams.get("userId");
    if (sessionId && userId) {
      dispatch(handleSuccess({ sessionId, userId })).then((action: any) => {
        if (handleSuccess.fulfilled.match(action)) {
          console.log("Payment Data", action.payload);
        } else if (handleSuccess.rejected.match(action)) {
          console.error("Failed to fetch payment data", action.error);
        }
      });
    }
  }, [dispatch]);

  return (
    <section className="flex items-center justify-center py-32 bg-gray-100 md:m-0 px-4  ">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-medium text-red-500">
          Payment Was Successful !!!
        </h1>
        <p className="mt-4">
          Checkout Details about your Order More details was sent to your Email!
        </p>
        <p className="mt-2">Thank you for shopping with us.</p>

        <Link to="/orders">
          <button className="mt-4 inline-block px-4 py-2 text-white bg-red-500 rounded transition-colors duration-300 cursor-pointer hover:bg-green-600">
            Checkout your Order
          </button>
        </Link>
      </div>
    </section>
  );
};

const CancelledPayment = () => (
  <section className="flex items-center justify-center py-32 bg-gray-100 md:m-0 px-4  ">
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h1 className="text-2xl font-medium text-red-500">
        ❌ Payment Was Cancelled
      </h1>
      <p className="mt-4">
        Checkout Details about your carts If you wish to adjust !
      </p>
      <p className="mt-2">Thank you for shopping with us.</p>

      <Link to="/carts">
        <button className="mt-4 inline-block px-4 py-2 text-white bg-red-500 rounded transition-colors duration-300 cursor-pointer hover:bg-green-600">
          Checkout your Carts
        </button>
      </Link>
    </div>
  </section>
);
export default Payment;
export { SuccessfulPayment, CancelledPayment };
