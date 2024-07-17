import { configureStore } from "@reduxjs/toolkit";

import productsReducer, {
  fetchProducts,
  deleteProduct,
  handleSearchProduct,
} from "../redux/reducers/productsSlice";
import api from "../redux/api/api";

jest.mock("../redux/api/api");

describe("products slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  it("should handle fetchProducts", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
    ];

    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { products: mockProducts },
    });

    await store.dispatch(fetchProducts());

    expect(store.getState().products.data).toEqual(mockProducts);
    expect(store.getState().products.loading).toBe(false);
  });

  it("should handle deleteProduct", async () => {
    const productId = 1;

    (api.delete as jest.Mock).mockResolvedValueOnce({});

    await store.dispatch(deleteProduct(productId));

    expect(store.getState().products.data).not.toContainEqual({
      id: productId,
    });
  });

  it("should handle handleSearchProduct", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
    ];

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockProducts });

    await store.dispatch(handleSearchProduct({ name: "Product" }));

    expect(store.getState().products.data).toEqual(mockProducts);
    expect(store.getState().products.loading).toBe(false);
  });
});
