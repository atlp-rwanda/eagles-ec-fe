import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../redux/hooks";
import Spinner from "../../components/dashboard/Spinner";
import { fetchProducts } from "../../redux/reducers/productsSlice";

const Table: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: any) => state.products.data);
  const loading = useSelector((state: any) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const currentItems = products
    .slice(0, 5)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return (
    <div className="bg-white flex-shrink-0 p-4 w-full lg:w-1/2 rounded-lg overflow-x-auto">
      <div className="flex justify-between items-center py-3 mb-2">
        <h2 className="text-lg md:text-lg font-bold text-black">
          Recent products
        </h2>
      </div>
      <div className="">
        <div className="overflow-x-scroll">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="px-3 pl-5 bg-light-blue rounded-lg">
                <th className="rounded-l-[12px] py-2 text-md font-medium px-4 text-left whitespace-nowrap text-black">
                  Product
                </th>
                <th className="py-2 text-md font-medium px-4 text-left text-black">
                  category
                </th>
                <th className="py-2 text-md font-medium px-4 text-left text-black whitespace-nowrap">
                  CreatedAt
                </th>
                <th className="py-2 text-md font-medium px-4 text-left text-black">
                  Price
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-24">
                    <p className="mb-4">Loading best selling stocks...</p>
                    <Spinner />
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-24">
                    No stocks found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item: any) => (
                  <tr key={item.id} className="px-2">
                    <td className="py-3 px-4 flex items-center gap-2 min-w-[200px]">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-10 h-10 object-cover mr-2"
                      />
                      <span className="text-dark-gray">{item.name}</span>
                    </td>
                    <td className="py-3 px-4 text-dark-gray">
                      {item.category.name}
                    </td>
                    <td className="py-3 px-4 text-dark-gray">
                      {new Date(item.createdAt).toDateString()}
                    </td>
                    <td className="py-3 px-4 text-dark-gray">{item.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
