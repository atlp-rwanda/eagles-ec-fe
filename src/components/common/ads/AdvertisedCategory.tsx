import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { createAds } from "../../../redux/reducers/listAddSlice";
import { RootState } from "../../../redux/store";
import Spinner from "../auth/Loader";

const AdvertisedCategory = () => {
  const dispatch = useDispatch();
  const { data, isLoading }: any = useSelector((state: RootState) => state.ads);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // @ts-ignore
    dispatch(createAds());
  }, [dispatch]);

  return (
    <div className="w-full overflow-hidden">
      <div className="mt-4 mb-6">
        <h1 className="text-2xl">Advertisement</h1>
      </div>
      <div className="flex gap-3 overflow-x-auto hide">
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <motion.div
            className="flex gap-5"
            initial={{ x: 0 }}
            animate={{ x: isHovered ? 10 : "-1000% " }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 10000 : 60,
              ease: "linear",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {data?.data?.map((img) => (
              <div
                key={img.id}
                className="relative flex-shrink-0 hover-container"
              >
                <img
                  src={img.image}
                  alt={img.name}
                  loading="lazy"
                  className="w-80 h-80 object-cover rounded-"
                />
                {img.discount && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-bold p-2">
                    {(((img.price - img.discount) / img.price) * 100).toFixed(
                      2,
                    )}
                    % OFF
                  </div>
                )}
                <div className="hover-content absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="">
                    <Link to="/products">
                      <p className="text-red-500 font-bold text-center mt-6">
                        Shop Now
                      </p>
                    </Link>
                    <p className="font-bold text-red-100 pt-6 text-center">
                      $
                      {img.price}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 flex justify-center  w-full bg-black py-2">
                  <p className="font-bold text-center text-white ">
                    {img.name}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdvertisedCategory;
