import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaCircle } from "react-icons/fa";
import useMediaQuery from "@mui/material/useMediaQuery";

const SalesChart = ({ data }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const CustomBar = (props) => {
    const {
      x, y, width, height, fill,
    } = props;
    const barWidth = isMobile ? 10 : 20;
    const centeredX = x + (width - barWidth) / 2;
    const radius = 7;
    return (
      <path
        d={`M${centeredX},${y + height} 
            v-${height - radius}
            a${radius},${radius} 0 0 1 ${radius},-${radius} 
            h${barWidth - radius * 2}
            a${radius},${radius} 0 0 1 ${radius},${radius} 
            v${height - radius}
            h-${barWidth}
            z`}
        fill={fill}
      />
    );
  };

  const CustomTooltip = ({ active, payload, coordinate }: any) => {
    if (active && payload && payload.length) {
      const sales = payload.find((entry) => entry.dataKey === "sales")?.value;
      const products = payload.find(
        (entry) => entry.dataKey === "products",
      )?.value;
      const top = coordinate.y - 200;
      const left = coordinate.x - 48;

      const salesValue = sales;
      const productsValue = products;

      return (
        <div
          className="custom-tooltip p-3 bg-white shadow rounded text-md"
          style={{ position: "absolute", top: `${top}px`, left: `${left}px` }}
        >
          <div className="text-lg text-center flex items-center gap-2">
            <FaCircle className="text-[10px] text-blue-600" />
            <span className="text-black">Sales</span>
          </div>
          <div className="text-lg text-center flex items-center justify-center gap-2">
            <span className="text-lg text-center">{salesValue}</span>
          </div>
          <div className="text-lg text-center flex items-center justify-center gap-2">
            <FaCircle className="text-[10px] text-black dark:text-yellow" />
            <span>Products</span>
          </div>
          <div className="flex items-center justify-center gap-2 w-full">
            <span className="text-lg text-center">{productsValue}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="col-span-1 w-full md:col-span-2 py-2 bg-white px-2 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 px-4">
        <div className="flex items-center gap-2 md:gap-4 py-4">
          <h2 className="text-md md:text-lg lg:text-xl font-bold text-black">
            Trades Overview
          </h2>
          <div className="flex items-center">
            <FaCircle className="text-blue-600 text-[10px]" />
            <span className="ml-1 text-black  text-[12px] md:text-lg">
              Sales
            </span>
          </div>
          <div className="flex items-center">
            <FaCircle className="text- text-[10px]" />
            <span className="ml-1 text-black text-[12px] md:text-lg">
              Products
            </span>
          </div>
        </div>
      </div>
      <ResponsiveContainer height={isMobile ? 250 : 400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="10%"
          barGap={0}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#687588" }} />
          <YAxis axisLine={false} tick={{ fill: "#687588" }} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="sales"
            fill="#1456F5"
            barSize={20}
            shape={<CustomBar />}
          />
          <Bar
            dataKey="products"
            fill="black"
            barSize={20}
            shape={<CustomBar />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
