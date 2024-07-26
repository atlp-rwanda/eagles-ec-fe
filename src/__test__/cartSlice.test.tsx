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
import axios from "../redux/api/api";

jest.mock("../redux/api/api");

describe("cartManageSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  it("should handle initial state", () => {
    expect(store.getState().cart).toEqual({
      isLoading: false,
      data: [],
      error: false,
      delete: { isLoading: false, error: false },
      add: { isLoading: false, data: [], error: null },
      remove: { isLoading: false, error: false },
      update: { isLoading: false, data: [], error: false },
    });
  });

  it("should handle cartManage.fulfilled", async () => {
    const mockData = [{ id: "1", quantity: 2 }];
    (axios.get as jest.Mock).mockResolvedValue({
      data: { userCart: { items: mockData } },
    });

    await store.dispatch(cartManage());

    expect(store.getState().cart.data).toEqual(mockData);
    expect(store.getState().cart.isLoading).toBeFalsy();
  });

  it("should handle cartManage.rejected", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await store.dispatch(cartManage());

    expect(store.getState().cart.error).toBeTruthy();
    expect(store.getState().cart.isLoading).toBeFalsy();
  });

  it("should handle addToCart.fulfilled", async () => {
    const mockItem = { id: "2", quantity: 1 };
    (axios.post as jest.Mock).mockResolvedValue({ data: mockItem });

    await store.dispatch(addToCart({ productId: 2, quantity: 1 }));

    expect(store.getState().cart.data).toContainEqual(mockItem);
  });

  it("should handle addToCart.rejected", async () => {
    const errorMessage = "Failed to add item to cart";
    (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await store.dispatch(addToCart({ productId: 2, quantity: 1 }));

    expect(store.getState().cart.add.error).toEqual(errorMessage);
  });

  it("should handle removeFromCart.fulfilled", async () => {
    (axios.put as jest.Mock).mockResolvedValue({ data: {} });
    await store.dispatch(removeFromCart());

    expect(store.getState().cart.remove.isLoading).toBeFalsy();
  });

  it("should handle removeFromCart.rejected", async () => {
    const errorMessage = "Failed to remove item from cart";
    (axios.put as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await store.dispatch(removeFromCart());

    expect(store.getState().cart.remove.error).toBeTruthy();
  });

  it("should handle cartDelete.fulfilled", async () => {
    (axios.delete as jest.Mock).mockResolvedValue({ data: {} });
    await store.dispatch(cartDelete());

    expect(store.getState().cart.delete.isLoading).toBeFalsy();
  });

  it("should handle cartDelete.rejected", async () => {
    const errorMessage = "Failed to delete cart";
    (axios.delete as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await store.dispatch(cartDelete());

    expect(store.getState().cart.delete.error).toBeTruthy();
  });

  it("should handle updateCarts return undefined.", async () => {
    const mockItem = { id: "1", quantity: 3 };
    (axios.patch as jest.Mock).mockResolvedValue({ data: mockItem });

    store.dispatch({
      type: "carts/cartManage/fulfilled",
      payload: [{ id: "1", quantity: 2 }],
    });
    await store.dispatch(updateCarts({ productId: "1", quantity: 3 }));

    expect(store.getState().cart.data[0]).toEqual(undefined);
  });

  it("should handle updateCarts.rejected", async () => {
    const errorMessage = "Failed to update cart";
    (axios.patch as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await store.dispatch(updateCarts({ productId: "1", quantity: 3 }));

    expect(store.getState().cart.update.error).toBeTruthy();
  });

  it("should return undefined increaseQuantity", () => {
    store.dispatch({
      type: "carts/cartManage/fulfilled",
      payload: [{ id: "1", quantity: 2 }],
    });
    store.dispatch(increaseQuantity("1"));

    expect(store.getState().cart.data.quantity).toEqual(undefined);
  });

  it("should return undefined decreaseQuantity", () => {
    store.dispatch({
      type: "carts/cartManage/fulfilled",
      payload: [{ id: "1", quantity: 2 }],
    });
    store.dispatch(decreaseQuantity("1"));

    expect(store.getState().cart.data.quantity).toEqual(undefined);
  });
});
