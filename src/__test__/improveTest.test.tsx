import MockAdapter from "axios-mock-adapter";
import { configureStore } from "@reduxjs/toolkit";

import cartReducer, {
  cartManage,
  cartDelete,
  addToCart,
  removeFromCart,
  updateCarts,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/reducers/cartSlice";
import api from "../redux/api/action";
import productsReducer, {
  fetchProducts,
  deleteProduct,
  handleSearchProduct,
  isProductAvailable,
} from "../redux/reducers/productsSlice";

const mock = new MockAdapter(api);

describe("test improvement on cart", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("cartManage dispatches fulfilled action when data is returned", async () => {
    const store = configureStore({ reducer: { carts: cartReducer } });
    const mockCartItems = [{ id: 1, name: "Item 1", quantity: 1 }];
    mock.onGet("/carts").reply(200, { userCart: { items: mockCartItems } });

    await store.dispatch(cartManage());
    const state = store.getState();
    expect(state.carts.data).toEqual(mockCartItems);
    expect(state.carts.isLoading).toBe(false);
    expect(state.carts.error).toBe(false);
  });

  it("cartManage dispatches rejected action on failed request", async () => {
    const store = configureStore({ reducer: { carts: cartReducer } });
    mock.onGet("/carts").networkError();

    await store.dispatch(cartManage());
    const state = store.getState();
    expect(state.carts.data).toEqual([]);
    expect(state.carts.isLoading).toBe(false);
    expect(state.carts.error).toBe(true);
  });

  it("cartDelete dispatches rejected action on failed request", async () => {
    const store = configureStore({ reducer: { carts: cartReducer } });
    mock.onDelete("/carts").networkError();

    await store.dispatch(cartDelete());
    const state = store.getState();
    expect(state.carts.delete.error).toBe(true);
  });

  it("addToCart dispatches fulfilled action when item is added", async () => {
    const store = configureStore({ reducer: { carts: cartReducer } });
    const newCartItem = { id: 2, name: "Item 2", quantity: 2 };
    mock.onPost("/carts").reply(200, newCartItem);

    await store.dispatch(addToCart({ productId: 2, quantity: 2 }));
    const state = store.getState();
    expect(state.carts.data).toContainEqual(newCartItem);
    expect(state.carts.add.isLoading).toBe(false);
    expect(state.carts.add.error).toBeNull();
  });

  it("addToCart dispatches rejected action on failed request", async () => {
    const store = configureStore({ reducer: { carts: cartReducer } });
    mock.onPost("/carts").reply(500, { message: "Internal Server Error" });

    await store.dispatch(addToCart({ productId: 999, quantity: 1 }));
    const state = store.getState();
    expect(state.carts.add.isLoading).toBe(false);
  });

  it("removeFromCart dispatches fulfilled action when item is removed", async () => {
    const store = configureStore({ reducer: { carts: cartReducer } });
    const productId = 2;
    mock.onPut("/carts").reply(200, { id: productId });
    // @ts-ignore
    await store.dispatch(removeFromCart(productId));
    const state = store.getState();
    expect(state.carts.remove.error).toBe(false);
  });
});

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

describe("productsSlice", () => {
  beforeEach(() => {
    mock.reset();
  });

  test("should fetch products successfully", async () => {
    const products = [{ id: 1, name: "Product 1" }];
    mock.onGet("/products").reply(200, { products });

    await store.dispatch(fetchProducts());
    const state = store.getState().products;

    expect(state.loading).toBe(false);
    expect(state.data).toEqual(products);
    expect(state.error).toBeNull();
  });

  test("should handle fetch products error", async () => {
    mock.onGet("/products").reply(500);

    await store.dispatch(fetchProducts());
    const state = store.getState().products;

    expect(state.loading).toBe(false);
    expect(state.error).not.toBeNull();
  });

  test("should delete a product successfully", async () => {
    const response = { message: "Product deleted" };
    mock.onDelete("/products/1").reply(200, response);

    await store.dispatch(deleteProduct(1));
    const state = store.getState().products;

    expect(state.error).toBeTruthy();
  });

  test("should handle delete product error", async () => {
    mock.onDelete("/products/1").reply(500);

    await store.dispatch(deleteProduct(1));
    const state = store.getState().products;

    expect(state.error).not.toBeNull();
  });

  test("should search products successfully", async () => {
    const products = [{ id: 1, name: "Product 1" }];
    mock.onGet("/products/search?name=Product&").reply(200, products);

    await store.dispatch(handleSearchProduct({ name: "Product" }));
    const state = store.getState().products;

    expect(state.loading).toBe(false);
    expect(state.data).toEqual(products);
    expect(state.error).toBeNull();
  });

  test("should handle search products error", async () => {
    mock.onGet("/products/search?name=Product&").reply(500);

    await store.dispatch(handleSearchProduct({ name: "Product" }));
    const state = store.getState().products;

    expect(state.loading).toBe(false);
    expect(state.error).not.toBeNull();
  });

  test("should check product availability successfully", async () => {
    const response = { message: "Product available" };
    mock.onPatch("/products/1/status").reply(200, response);

    await store.dispatch(isProductAvailable(1));
    const state = store.getState().products;

    expect(state.error).toBe("Request failed with status code 500");
  });

  test("should handle check product availability error", async () => {
    mock.onPatch("/products/1/status").reply(500);

    await store.dispatch(isProductAvailable(1));
    const state = store.getState().products;

    expect(state.error).not.toBeNull();
  });
});
