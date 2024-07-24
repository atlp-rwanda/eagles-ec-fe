import React from "react";

interface Product {
  id: number;
  name: string;
  images: string[];
  stockQuantity: number;
  price: number;
}

interface WishedProductsDetails {
  products: Product[];
  onClose: () => void;
}

const WisheProductDetails: React.FC<WishedProductsDetails> = ({
  products,
  onClose,
}) => (
  <div className="fixed inset-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-[40%] overflow-x-auto">
      <h1 className="items-center font-medium text-center">
        Wished Products details
      </h1>
      <table className="min-w-full bg-white border-collapse">
        <thead className="border-b-2">
          <tr className="px-3 bg-light-blue rounded-lg">
            <th className="pr-6 rounded-l-[12px] py-2 pl-4 text-sm font-medium text-left whitespace-nowrap text-black">
              Products
            </th>
            <th className="py-2 px-4 text-sm font-medium text-left text-black whitespace-nowrap">
              Price
            </th>
            <th className="py-2 px-4 text-sm font-medium text-center text-black whitespace-nowrap">
              Stock Quantity
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr>
              <td className="pl-4 pr-10 xl:pr-10 py-2 flex items-center whitespace-nowrap space-x-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-10 h-10 object-cover mr-2"
                />
                <span className="text-dark-gray text-sm">{product.name}</span>
              </td>
              <td className="py-3 px-4 text-gray-700 text-sm">
                {product.price}
              </td>
              <td className="py-3 px-4 text-gray-700 text-sm text-center">
                {product.stockQuantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
);

export default WisheProductDetails;
