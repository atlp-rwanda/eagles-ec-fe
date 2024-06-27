import "@testing-library/jest-dom";
import {
  fireEvent, render, screen, waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "../redux/store";
import { fetchProducts } from "../redux/reducers/productsSlice";

jest.mock("react-dropzone", () => ({
  useDropzone: jest.fn(),
}));

jest.mock("../redux/api/productsApiSlice", () => ({
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../components/dashboard/ConfirmModal", () => () => (
  <div>ConfirmModal</div>
));
jest.mock("../components/dashboard/Spinner", () => () => <div>Spinner</div>);
jest.mock(
  "../components/dashboard/ToggleSwitch",
  () => ({ checked, onChange }) => (
    <div onClick={onChange}>
      ToggleSwitch
      {checked ? "On" : "Off"}
    </div>
  ),
);

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    stockQuantity: 10,
    expiryDate: "2024-12-31T00:00:00.000Z",
    price: 100,
    category: { name: "Electronics" },
    isAvailable: true,
    images: ["image1.png"],
  },
  {
    id: 2,
    name: "Product 2",
    stockQuantity: 5,
    expiryDate: "2025-06-30T00:00:00.000Z",
    price: 50,
    category: { name: "Fashion" },
    isAvailable: true,
    images: ["image2.png"],
  },
];

global.URL.createObjectURL = jest.fn();

describe("Products slice tests", () => {
  it("should handle products initial state", () => {
    expect(store.getState().products).toEqual({
      loading: false,
      data: [],
      error: null,
    });
  });

  it("should handle products pending", () => {
    store.dispatch(fetchProducts.pending(""));
    expect(store.getState().products).toEqual({
      loading: true,
      data: [],
      error: null,
    });
  });

  it("should handle products fulfilled", () => {
    const mockData = { message: "success" };
    // @ts-ignore
    store.dispatch(fetchProducts.fulfilled(mockData, "", {}));
    expect(store.getState().products).toEqual({
      loading: false,
      data: mockData,
      error: null,
    });
  });

  it("should handle products fetch rejected", () => {
    // @ts-ignore
    store.dispatch(fetchProducts.rejected(null, "", {}));
    expect(store.getState().products.error).toEqual("Rejected");
  });
});
