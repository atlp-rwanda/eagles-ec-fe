import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { MenuItem, TextField } from "@mui/material";

import ConfirmModal from "../ConfirmModal";
import Spinner from "../Spinner";
import {
  deleteProduct,
  fetchProducts,
  isProductAvailable,
} from "../../../redux/reducers/productsSlice";
import { useAppDispatch } from "../../../redux/hooks";
import ToggleSwitch from "../ToggleSwitch";

const ProductsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: any) => state.products.data);
  const loading = useSelector((state: any) => state.products.loading);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const sorted = [...products].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
    setSortedProducts(sorted);
  }, [products]);

  const [confirmDeleteModal, setConfirmModal] = useState(false);
  const [confirmTaggleModal, setConfirmTaggleModal] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [taggleLoading, setTaggleLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1);
  };

  const handleCancelTaggle = () => {
    setConfirmTaggleModal(false);
  };

  const handleTaggleClick = (product: any) => {
    setSelectedProduct(product);
    setConfirmTaggleModal(true);
  };

  const handleToggle = async () => {
    if (selectedProduct !== null) {
      try {
        setTaggleLoading(true);
        const response = await dispatch(
          // @ts-ignore
          isProductAvailable(selectedProduct.id),
        ).unwrap();
        setTaggleLoading(false);
        setIsAvailable(false);
        setConfirmTaggleModal(false);
        await dispatch(fetchProducts());
        toast.success(
          `Product was successfully ${isAvailable ? "Disabled" : "Enabled"}`,
        );
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmModal(false);
  };

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct !== null) {
      try {
        setLoadingDelete(true);
        const response = await dispatch(
          // @ts-ignore
          deleteProduct(selectedProduct.id),
        ).unwrap();
        setLoadingDelete(false);
        setConfirmModal(false);
        dispatch(fetchProducts());
        toast.success("Product was successfully deleted");
      } catch (err: any) {
        setLoadingDelete(false);
        console.log(err);
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="relative">
      <ToastContainer />
      <div className="overflow-x-scroll ">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-[#F7F8FA]">
            <tr className="px-3 bg-light-blue rounded-lg">
              <th className="pr-6 rounded-l-[12px] py-2 pl-4 text-sm font-medium text-left whitespace-nowrap text-black">
                Product name
              </th>
              <th className="py-2 px-4 text-sm font-medium text-left text-black whitespace-nowrap">
                Stock Quantity
              </th>
              <th className="py-2 px-4 text-sm font-medium text-left text-black whitespace-nowrap">
                Expiry Date
              </th>
              <th className="py-2 px-4 text-sm font-medium text-left text-black whitespace-nowrap">
                Price
              </th>
              <th className="py-2 px-4 text-sm font-medium text-left text-black whitespace-nowrap">
                Category
              </th>
              <th className="py-2 px-4 text-sm font-medium text-left text-black whitespace-nowrap">
                Active
              </th>
              <th className="py-2 px-4 text-sm font-medium text-left text-black rounded-r-[12px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  <Spinner />
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-dark-gray">
                  No products found.
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr key={item.id} className="px-2">
                  <td className="pl-4 pr-10 xl:pr-10 py-2 flex items-center whitespace-nowrap space-x-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-10 h-10 object-cover mr-2"
                    />
                    <span className="text-dark-gray text-sm">{item?.name}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm">
                    {item.stockQuantity}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm whitespace-nowrap">
                    {new Date(item.expiryDate).toDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {item.price}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <span className=" px-2 rounded py-1 text-left whitespace-nowrap">
                      {item.category.name}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <ToggleSwitch
                      checked={item.isAvailable}
                      onChange={() => handleTaggleClick(item)}
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <Link
                      to={`/dashboard/products/${item.id}`}
                      className="text-brand-blue "
                    >
                      <button>
                        <FaRegEdit className="text-xl text-blue-600" />
                      </button>
                    </Link>
                    <button
                      type="button"
                      data-testid="delete-icon"
                      onClick={() => handleDeleteClick(item)}
                    >
                      <RiDeleteBin5Line className="text-xl text-[#DB4444] ml-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between py-3 flex-col md:flex-row">
        <div className="flex items-center gap-1">
          <label>Show Results</label>
          <TextField
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            size="small"
            select
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </TextField>
        </div>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} justifyContent="center" />
          <Pagination
            size="medium"
            count={Math.ceil(sortedProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                color: "white",
                backgroundColor: "#EB5757",
                "&:hover": {
                  backgroundColor: "#EB5757",
                },
              },
            }}
          />
        </Stack>
      </div>
      {confirmDeleteModal && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          product={selectedProduct}
          loading={loadingDelete}
          text="Delete"
          onCancel={handleCancelDelete}
          message="Are you sure you want to delete this product?"
        />
      )}
      {confirmTaggleModal && (
        <ConfirmModal
          onConfirm={handleToggle}
          product={selectedProduct}
          loading={taggleLoading}
          text="Confirm"
          onCancel={handleCancelTaggle}
          message={`Are you sure you want to ${isAvailable ? "disable" : "enable"} this product?`}
        />
      )}
    </div>
  );
};

export default ProductsTable;
