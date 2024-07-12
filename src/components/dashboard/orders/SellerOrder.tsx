import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

import Layout from "../../layouts/SellerLayout";
import { useAppDispatch } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import Spinner from "../../common/auth/Loader";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../../redux/reducers/ordersSlice";
import { ProductOrders } from "../../../../type";
import Warning from "../../common/notify/Warning";

const SellerOrder = () => {
  const token: any = localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductOrders | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (product: ProductOrders) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const dispatch = useAppDispatch();
  const { data, error } = useSelector((state: RootState) => state.order);
  const loading = useSelector((state: RootState) => state.order.isLoading);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    dispatch(fetchOrders());
  }, [dispatch]);

  if (error) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <h2 className="md:w-[30%] w-[90%]  text-center">
          Cannot get orders for you, unknow error occured.
          <span className="font-semibold text-orange-600">
            {" "}
            check your network or server error 😓
          </span>
        </h2>
      </div>
    );
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (e) {
    return <Warning />;
  }
  // @ts-ignore
  if (decoded.roleId !== 2) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <h2 className="w-[30%] text-center">
          You're not allowed to perform this action 🚫
        </h2>
      </div>
    );
  }

  const handleStatusChange = (orderId: number, status: string) => {
    setTimeout(() => {
      dispatch(fetchOrders());
      dispatch(fetchOrders());
    }, 1000);
    dispatch(updateOrderStatus({ orderId, status }));
    toast.success("status updated successfully");
  };

  return (
    <Layout>
      <ToastContainer />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-24">
          <div className="bg-white my-4 py-5 shadow-2xl px-5">
            <h3 className="text-2xl">Orders</h3>
          </div>
          <div className="bg-white shadow-xl p-3 px-5 min-w-full hide overflow-auto">
            {!Array.isArray(data) && data.length !== 0 ? (
              <div className="flex h-[80vh] justify-center items-center flex-col">
                <h1>Oops, you have no order yet 😢</h1>
                <p className="">Add products to attract more clients</p>
                <Link to="/dashboard/addproduct">
                  <button className="mt-4 inline-block px-4 py-2 text-white bg-red-500 rounded transition-colors duration-300 cursor-pointer hover:bg-green-600">
                    Add products
                  </button>
                </Link>
              </div>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Customer Name
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Email
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Last Order
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Spent
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Status
                    </th>
                    <th className="text-left px-4 py-2 whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data)
                    && data.map((order, index) => (
                      <tr key={index}>
                        <td className="text-left px-4 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={
                                order?.order?.buyer?.profile?.profileImage
                                || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                              }
                              alt="users"
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <h3>{order.order?.buyer.name}</h3>
                          </div>
                        </td>
                        <td className="text-left px-4 py-2 whitespace-nowrap">
                          <p>{order.order?.buyer.email}</p>
                        </td>
                        <td className="text-left px-4 py-2 whitespace-nowrap">
                          <p>
                            {moment(order.order?.deliveryDate).format(
                              "DD MMM, YYYY",
                            )}
                          </p>
                        </td>
                        <td className="text-left px-4 py-2 whitespace-nowrap">
                          <p>
                            <NumericFormat
                              value={order.products?.reduce(
                                (total: number, product: any) =>
                                  total + product.product.price,
                                0,
                              )}
                              thousandSeparator=","
                              displayType="text"
                              prefix="RWF"
                            />
                            {}
                          </p>
                        </td>
                        <td className="text-left px-4 py-2 whitespace-nowrap">
                          {order.products && order.products.length > 0 ? (
                            <p
                              className={`bg-[#eaeaea] px-3 py-1 text-center rounded-sm cursor-pointer ${
                                order.products[0].status === "Delivered"
                                  ? "text-[#27AE60]"
                                  : order.products[0].status === "Pending"
                                    ? "text-yellow-800"
                                    : "text-[#FF0000]"
                              }`}
                            >
                              {order.products[0].status}
                            </p>
                          ) : (
                            <p>No Products</p>
                          )}
                        </td>
                        <td>
                          <select
                            className="outline-none rounded-lg"
                            name="status"
                            value={
                              order.products && order.products.length > 0
                                ? order.products[0].status
                                : ""
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                order.order?.id,
                                e.target.value,
                              )}
                            disabled={
                              !order.products || order.products.length === 0
                            }
                          >
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Pending">Pending</option>
                          </select>
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
                className="fixed inset-0 flex items-center justify-center bg-black z-40 bg-opacity-50"
                onClick={closeModal}
              >
                <div
                  className="bg-white p-5 rounded-lg shadow-lg min-w-[50vh] overflow-auto mx-2"
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
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.map((productItem: any) => (
                        <tr key={productItem.id}>
                          <td className="text-left px-4 py-2 whitespace-nowrap">
                            {productItem.product.name}
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
      )}
    </Layout>
  );
};

export default SellerOrder;
