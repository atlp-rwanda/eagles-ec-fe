import React from "react";
import { Link } from "react-router-dom";

const Notification = () => (
  <div className="w-full h-[70vh] flex justify-center items-center ">
    <div className="md:w-[40%] mx-4 w-full shadow-md p-5 rounded-md">
      <h1 className="text-center">
        You're not logged in to access cart, Please login to access cart
      </h1>
      <div className="flex justify-between gap-2 m-5">
        <div className="border border-gray-600 rounded-sm px-6 md:px-6 py-2 hover:border-[1px] text-[12px] hover:border-red-600 cursor-pointer transition-all">
          <Link to="/">Back home</Link>
        </div>
        <div className="border border-gray-600 rounded-sm px-6 md:px-6 py-2 hover:border-[1px] text-[12px] hover:border-blue-600 cursor-pointer transition-all">
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Notification;
