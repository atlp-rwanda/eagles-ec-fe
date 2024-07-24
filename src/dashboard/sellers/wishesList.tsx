import Layout from "../../components/layouts/SellerLayout";
import WishesTable from "../../components/dashboard/wishesTable";

const Wishes = () => (
  <Layout>
    <div className="mt-24 mb-4">
      <h1 className="text-2xl font-medium text-black">Wishes List</h1>
      <p className="text-dark-gray">
        Detailed information about your wished products
      </p>
    </div>
    <section className="lg:pl-5 bg-white relative xl:w-full px-4">
      <WishesTable />
    </section>
  </Layout>
);

export default Wishes;
