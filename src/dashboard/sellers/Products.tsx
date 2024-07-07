import { Link } from "react-router-dom";

import Layout from "../../components/layouts/SellerLayout";
import CategorySelect from "../../components/dashboard/products/CategorySelect";
import ProductsTable from "../../components/dashboard/products/ProductsTable";

const Products = () => {
  const handleSortSelect = (option: string) => {
    console.log("Selected sort option:", option);
  };

  const handleCategorySelect = (option: string) => {
    console.log("Selected category option:", option);
  };

  return (
    <Layout>
      <div className="mt-24 mb-4">
        <h1 className="text-2xl font-medium text-black">Products List</h1>
        <p className="text-dark-gray">
          Detailed information about your products
        </p>
      </div>
      <section className="lg:pl-5 bg-white relative xl:w-full px-4">
        <div className="flex justify-between w-full flex-col md:flex-row gap-2 items-center py-4 mb-4">
          <div className="flex text-dark-gray flex-col md:flex-row w-full gap-2">
            <CategorySelect
              options={["Best sellers", "New arrivals", "Top rated"]}
              defaultValue="Best sellers"
              onSelect={handleSortSelect}
            />
            <CategorySelect
              options={["All Categories", "Electronics", "Fashion", "Home"]}
              defaultValue="All Categories"
              onSelect={handleCategorySelect}
            />
          </div>
          <Link
            to="/dashboard/addproduct"
            className="bg-[#DB4444] text-white w-full md:w-1/5 text-center px-2 py-2 rounded-[8px]"
          >
            Add Product
          </Link>
        </div>
        <ProductsTable />
      </section>
    </Layout>
  );
};

export default Products;
