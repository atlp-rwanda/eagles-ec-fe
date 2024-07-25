import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex w-full min-h-screen px-[2%] md:px-[4%] justify-center items-center">
    <div className="text-center">
      <div className="text-2xl mb-1 font-bold">404 Not Found</div>
      <p className="mb-4">
        The page you visited is not found. You may go back to the home page.
      </p>
      <button
        type="button"
        className="px-4 py-2 bg-[#DB4444] text-white rounded"
      >
        <Link to="/">Back to home page</Link>
      </button>
    </div>
  </div>
);

export default NotFound;
