import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { clearNetworkError } from "../../../redux/reducers/NetworkErrorSlice";

const Popup = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const showPopup = useSelector((state) => state.networkError.showPopup);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#D0D0D0] bg-opacity-50">
      <div className="relative bg-white rounded-lg p-10 w-[90%] md:w-[65%] lg:w-[55%] xl:w-[50%] duration-75 animate-fadeIn">
        <p>
          📵
          <b>Network Error </b>
          <br />
          Please check your internet connection.
        </p>
        <button
          onClick={() => dispatch(clearNetworkError())}
          className="mt-10 bg-transparent text-primary border border-[#DB4444] px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Popup;
