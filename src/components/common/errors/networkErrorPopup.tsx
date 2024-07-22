import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";

import api from "../../../redux/api/action";
// import { useSelector, useDispatch } from "react-redux";

// import { clearNetworkError } from "../../../redux/reducers/networkErrorSlice";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const response = api
      .get("/")
      .then(() => {
        setShowPopup(false);
      })
      .catch(() => {
        setShowPopup(true);
      });
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#000] bg-opacity-50">
      <div className="relative bg-white rounded-lg p-10 w-[90%] flex flex-col items-center gap-2 md:w-[65%] lg:w-[55%] xl:w-[50%] duration-75 animate-fadeIn">
        <h3 className="flex items-center gap-2">
          📵
          <b>Network Error </b>
        </h3>

        <p>Please check your internet connection.</p>
        <button
          onClick={() => setShowPopup(false)}
          className="bg-transparent text-primary border border-[#DB4444] px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default Popup;
