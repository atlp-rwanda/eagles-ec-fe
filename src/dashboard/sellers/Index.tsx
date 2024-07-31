import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RiCoinsLine } from "react-icons/ri";
import { GoArrowDownRight } from "react-icons/go";

import Layout from "../../components/layouts/SellerLayout";
import SalesChart from "../../components/dashboard/SalesChart";
import Button from "../../components/dashboard/Button";
import { useAppDispatch } from "../../redux/hooks";
import { fetchStats } from "../../redux/reducers/sellerStats";
import { transformStatsData } from "../../utils/transformData";
import solarGraph from "../../assets/solar_graph-up-linear.png";
import solarBag from "../../assets/solar_bag-3-linear.png";

import RecentProducts from "./RecentProducts";

const Index = () => {
  const sellerStats = useSelector((state: any) => state.sellerStats.data);
  const dispatch = useAppDispatch();
  const [transformedData, setTransformedData] = useState<any>({});

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  useEffect(() => {
    const transformedData = transformStatsData(sellerStats);
    setTransformedData(transformedData);
  }, [sellerStats]);

  console.log(transformedData);

  return (
    <Layout>
      <section className="flex flex-col relative gap-4 w-[100%] lg:px-2 mt-24">
        <div data-testid="dashboard-page" className="flex flex-col gap-4">
          <div className="bg-transparent w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 justify-between">
            <div className="bg-white w-full rounded-[12px] flex flex-col p-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-blue-600 rounded-full p-3">
                  <img src={solarGraph} alt="solar graph" />
                </div>
                <h2 className="text-lg 2xl:text-xl font-bold mb-2">
                  Total Sales
                </h2>
              </div>
              <p className="text-xl px-2">{transformedData.totalSales}</p>
            </div>
            <div className="bg-white w-full rounded-[12px] flex flex-col p-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-green-600 rounded-full p-3">
                  <RiCoinsLine className="text-white text-xl" />
                </div>
                <h2 className="text-lg 2xl:text-xl font-bold mb-2">
                  Total Revenue
                </h2>
              </div>
              <p className="text-xl px-2 whitespace-nowrap">
                RWF
                {transformedData.totalRevenue}
              </p>
            </div>
            <div className="bg-white w-full rounded-[12px] flex flex-col p-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-primary rounded-full p-3">
                  <img src={solarBag} alt="solar graph" />
                </div>
                <h2 className="text-lg 2xl:text-xl font-bold mb-2">
                  Expired products
                </h2>
              </div>
              <p className="text-xl px-2">
                {transformedData.expiredProducts?.length}
              </p>
            </div>
            <div className="bg-white w-full rounded-[12px] flex flex-col p-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-primary rounded-full p-3">
                  <GoArrowDownRight className="text-white text-xl" />
                </div>
                <h2 className="text-lg 2xl:text-xl font-bold mb-2">
                  Total loss
                </h2>
              </div>
              <p className="text-xl px-2 whitespace-nowrap">
                RWF
                {' '}
                {transformedData.totalLosses}
              </p>
            </div>
          </div>
          <div className="flex justify-between flex-col lg:flex-row gap-2 w-full">
            <SalesChart data={transformedData.chartData} />
            <RecentProducts />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
