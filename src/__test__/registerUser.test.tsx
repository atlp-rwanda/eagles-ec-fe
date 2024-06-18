import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "../redux/store";
import RegisterUser from "../pages/RegisterUser";

test("should render registration page correctly", async () => {
  render(
    <Provider store={store}>
      <Router>
        <RegisterUser />
      </Router>
    </Provider>,
  );
  const name = screen.getAllByPlaceholderText("Name");
  const username = screen.getAllByPlaceholderText("Username");
  const email = screen.getAllByPlaceholderText("Email");
  const password = screen.getAllByPlaceholderText("Password");

  expect(name).toBeTruthy();
  expect(username).toBeTruthy();
  expect(email).toBeTruthy();
  expect(password).toBeTruthy();
});
