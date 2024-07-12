import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

import { ProductOrders } from "../../type";
import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import Spinner from "../components/common/auth/Loader";
import Warning from "../components/common/notify/Warning";
import { fetchOrders } from "../redux/reducers/ordersSlice";

const SellerOrder = () => {
  const token: any = localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductOrders | null>(
    null,
  );

  const openModal = (product: ProductOrders) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const dispatch = useAppDispatch();
  const {
    data = [],
    isLoading,
    error,
  } = useSelector((state: RootState) => state.order);

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (e) {
    return <Warning />;
  }

  if (decoded.roleId !== 1) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <h2 className="w-[30%] text-center">
          You're not allowed to perform this action 🚫
        </h2>
      </div>
    );
  }

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getOrderStatus = (products: any[]) => {
    if (products.some((product) => product.status === "Pending")) {
      return "Pending";
    }
    if (products.some((product) => product.status === "Cancelled")) {
      return "Cancelled";
    }
    if (products.every((product) => product.status === "Delivered")) {
      return "Complete";
    }
    return "Pending";
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <h2 className="md:w-[30%] w-[90%] text-center">
          Cannot get orders for you, an unknown error occurred.
          <span className="font-semibold text-orange-600">
            {" "}
            Check your network or server error 😓
          </span>
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="bg-white my-4 py-5 shadow-2xl px-5">
        <h3 className="text-2xl">Orders</h3>
      </div>
      <div className="bg-white shadow-xl p-3 px-5 min-w-full hide overflow-auto">
        {!Array.isArray(data) && data.length !== 0 ? (
          <div className="flex h-[80vh] justify-center items-center flex-col">
            <h1>Oops, you have no order yet 😢</h1>
            <p className="">Place your order now click below button</p>
            <Link to="/products">
              <button className="mt-4 inline-block px-4 py-2 text-white bg-red-500 rounded transition-colors duration-300 cursor-pointer hover:bg-green-600">
                View products
              </button>
            </Link>
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 whitespace-nowrap">Name</th>
                <th className="text-left px-4 py-2 whitespace-nowrap">Email</th>
                <th className="text-left px-4 py-2 whitespace-nowrap">
                  Delivery Date
                </th>
                <th className="text-left px-4 py-2 whitespace-nowrap">
                  Status
                </th>
                <th className="text-left px-4 py-2 whitespace-nowrap">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data)
                && data.map((order: any) => (
                  <tr key={order.order.id}>
                    <td className="text-left px-9 py-2 whitespace-nowrap">
                      <div className="flex items-center whitespace-nowrap">
                        <img
                          src={
                            order?.order.buyer?.profile?.profileImage
                            || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                          }
                          className="w-10 h-10 rounded-full mr-3"
                          alt="normal"
                        />
                        <h3 className="">{order.order.buyer.name}</h3>
                      </div>
                    </td>
                    <td className="text-left px-4 py-2 whitespace-nowrap">
                      <p>{order.order.buyer.email}</p>
                    </td>
                    <td className="text-left px-4 py-2 whitespace-nowrap">
                      <p>
                        {moment(order.order.deliveryDate).format(
                          "DD MMM, YYYY",
                        )}
                      </p>
                    </td>
                    <td
                      className={`text-left px-4 py-2 whitespace-nowrap ${getOrderStatus(order.products) === "Complete" ? "text-green-500" : "text-red-500"} `}
                    >
                      {getOrderStatus(order.products)}
                    </td>
                    <td className="cursor-pointer text-left px-4 whitespace-nowrap">
                      <span
                        className="text-[14px]"
                        onClick={() => openModal(order.products)}
                      >
                        View
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {isModalOpen && selectedProduct && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-5 rounded-lg shadow-lg overflow-auto hide relative mx-1"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl mb-4">Product Details</h2>
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Product Name
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Price
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Quantity
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Total
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct?.map((productItem) => (
                    <tr key={productItem.id}>
                      <td className="text-left px-4 py-2  whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={productItem.product.images[0]}
                            alt=""
                            className="w-8 h-8"
                          />
                          <p className="whitespace-nowrap">
                            {productItem.product.name}
                          </p>
                        </div>
                      </td>
                      <td className="text-left px-4 py-2 whitespace-nowrap">
                        <NumericFormat
                          value={productItem.product.price}
                          thousandSeparator=","
                          displayType="text"
                          prefix="RWF"
                        />
                      </td>
                      <td className="text-left px-4 py-2 whitespace-nowrap">
                        {productItem.quantity}
                      </td>
                      <td className="text-left px-4 py-2 whitespace-nowrap">
                        <NumericFormat
                          value={
                            productItem.quantity * productItem.product.price
                          }
                          thousandSeparator=","
                          displayType="text"
                          prefix="RWF"
                        />
                      </td>
                      <td className="text-left px-4 py-2 whitespace-nowrap">
                        <p
                          className={`bg-[#eaeaea] px-3 py-1 text-center rounded-sm cursor-pointer ${
                            productItem.status === "Delivered"
                              ? "text-[#27AE60]"
                              : productItem.status === "Pending"
                                ? "text-yellow-800"
                                : "text-[#FF0000]"
                          }`}
                        >
                          {productItem.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrder;
