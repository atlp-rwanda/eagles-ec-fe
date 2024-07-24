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
