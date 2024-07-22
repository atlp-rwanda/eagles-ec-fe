import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <main>
      <AppRoutes />
      {location.pathname !== "/chat"
        && location.pathname !== "/login"
        && location.pathname !== "/register" && (
          <Link to="/chat">
            <div className="fixed bg-primary text-white shadow-md rounded px-3 py-3 z-50 right-6 bottom-6 cursor-pointer group">
              <IoChatbubbleEllipsesOutline className="text-[30px] text-white" />
            </div>
          </Link>
      )}
    </main>
  );
};

export default App;
