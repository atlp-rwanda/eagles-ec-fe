import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from "./redux/store";
import App from "./App";
import Popup from "./components/common/errors/networkErrorPopup";

const client = new QueryClient({});
const Main = () => {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const response = axios
      .get(process.env.BASE_URL as string)
      .then(() => {
        setShowPopup(false);
      })
      .catch(() => {
        setShowPopup(true);
      });
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <Router>
            {showPopup && <Popup />}
            <App />
          </Router>
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
