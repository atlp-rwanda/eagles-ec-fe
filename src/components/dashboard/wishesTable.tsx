import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWishes } from "../../redux/reducers/wishListSlice";
import { RootState, AppDispatch } from "../../redux/store";

import Spinner from "./Spinner";
import WisheProductDetails from "./products/wishedProducts";

interface Product {
  id: number;
  name: string;
  images: string[];
  stockQuantity: number;
  price: number;
}
interface WishedProductsInfo {
  userEmail: string;
  userName: string;
  wishedProductsCount: number;
  products: Product[];
}

const WishesTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { wishes, isLoading, error } = useSelector(
    (state: RootState) => state.wishes,
  );

  const [wishedProducts, setwishedProducts] = useState<WishedProductsInfo[]>(
    [],
  );
  const [selectedUserProducts, setSelectedUserProducts] = useState<
  Product[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchWishes());
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (wishes.length > 0) {
      const aggregatedData: Record<string, WishedProductsInfo> = {};

      wishes.forEach((wish) => {
        const userEmail = wish.user.email;
        if (!aggregatedData[userEmail]) {
          aggregatedData[userEmail] = {
            userEmail,
            userName: wish.user.name,
            wishedProductsCount: 0,
            products: [],
          };
        }
        aggregatedData[userEmail].wishedProductsCount += 1;
        aggregatedData[userEmail].products.push({
          id: wish.product.id,
          name: wish.product.name,
          images: wish.product.images,
          stockQuantity: wish.product.stockQuantity,
          price: wish.product.price,
        });
      });

      setwishedProducts(Object.values(aggregatedData));
    }
  }, [wishes]);
  const handleDetailsClick = (products: Product[]) => {
    setSelectedUserProducts(products);
  };

  const handleCloseDetails = () => {
    setSelectedUserProducts(null);
  };

  return (
    <div className="relative">
      {selectedUserProducts && (
        <WisheProductDetails
          products={selectedUserProducts}
          onClose={handleCloseDetails}
        />
      )}
      <div className="overflow-x-scroll ">
        <table className="min-w-full bg-white border-collapse">
          <thead className="border-b-2">
            <tr className="px-3 bg-light-blue rounded-lg">
              <th className="pr-6 rounded-l-[12px] py-2 pl-4 text-sm font-medium text-left whitespace-nowrap text-black">
                Customer Name
              </th>
              <th className="py-2 px-4 text-sm font-medium text-left text-black whitespace-nowrap">
                Email
              </th>
              <th className="py-2 px-4 text-sm font-medium text-left text-black whitespace-nowrap">
                Quatity
              </th>
              <th className="py-2 px-4 text-sm font-medium text-left text-black whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  <Spinner />
                </td>
              </tr>
            ) : wishedProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-dark-gray dark:text-white"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              wishedProducts.map((item) => (
                <tr key={item.userEmail} className="px-2">
                  <td className="pl-4 pr-10 xl:pr-10 py-2 flex items-center whitespace-nowrap space-x-3">
                    <span className="text-dark-gray text-sm">
                      {item?.userName}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm">
                    {item.userEmail}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm">
                    {item.wishedProductsCount}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <button
                      className=" px-4 py-1 bg-[#DB4444] text-white rounded-lg"
                      onClick={() => handleDetailsClick(item.products)}
                    >
                      Details
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

export default WishesTable;
