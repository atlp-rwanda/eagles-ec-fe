import React from "react";
import Skeleton from "react-loading-skeleton";

interface CardProps {
  title: string;
  number: number;
  Logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  loading?: boolean;
}

const NumberCard: React.FC<CardProps> = ({
  title,
  number,
  Logo,
  loading = false,
}) => (
  <div className="w-full p-1 sm:p-2 md:w-full lg:w-[33%] xl:w-[25%]">
    <div className="flex items-center justify-between w-full p-3 text-center bg-white rounded-lg shadow-md sm:p-4">
      {loading ? (
        <>
          <div className="flex flex-col items-start">
            <Skeleton width={80} height={20} />
            <Skeleton width={100} height={40} />
          </div>
          <div className="flex items-center justify-center w-12 border-2 rounded-lg h-fit">
            <Skeleton width={40} height={80} />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-start">
            <h3 className="text-[#A2B1C1]">{title}</h3>
            <p className="text-[32px] font-bold text-[#091F4A]">{number}</p>
          </div>
          <div
            className="flex items-center justify-center w-12 h-12 border-2 rounded-lg"
            style={{ backgroundColor: "#091F4A", borderColor: "#091F4A" }}
          >
            <Logo className="text-2xl font-bold text-white" />
          </div>
        </>
      )}
    </div>
  </div>
);

export default NumberCard;
