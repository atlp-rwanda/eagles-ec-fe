import React from "react";
import ReactDOM from "react-dom/client";

// eslint-disable-next-line import/order
import App from "./App";

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";

import { ArticleState, ArticleAction, DispatchType } from "../type";

import reducer from "./store/reducer";

const store: Store<ArticleState, ArticleAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
