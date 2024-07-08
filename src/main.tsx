import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from "./redux/store";
import App from "./App";
import Popup from "./components/common/errors/networtErrorPopup";

const client = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <Router>
          <Popup />
          <App />
        </Router>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
