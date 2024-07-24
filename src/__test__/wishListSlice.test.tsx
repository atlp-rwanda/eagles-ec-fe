import MockAdapter from "axios-mock-adapter";
import { configureStore } from "@reduxjs/toolkit";

import wishListSlice, {
  fetchWishes,
  addWish,
  deleteWish,
} from "../redux/reducers/wishListSlice";
import api from "../redux/api/action";

const mock = new MockAdapter(api);

describe("wishesSlice test", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("fetchWishes dispatches fulfilled action when data is returned", async () => {
    const store = configureStore({ reducer: { wishes: wishListSlice } });
    const mockWishes = [
      {
        id: 1,
        product: {
          id: 1,
          name: "Product",
          images: [],
          stockQuantity: 10,
          price: 100,
        },
        user: { name: "User", userName: "username", email: "email@test.com" },
      },
    ];
    mock.onGet(`/wishes`).reply(200, { wishes: mockWishes });

    await store.dispatch(fetchWishes());
    const state = store.getState();
    expect(state.wishes.wishes).toEqual(mockWishes);
    expect(state.wishes.isLoading).toBe(false);
    expect(state.wishes.error).toBeNull();
  });

  it("fetchWishes dispatches rejected action on failed request", async () => {
    const store = configureStore({ reducer: { wishes: wishListSlice } });
    mock.onGet(`/wishes`).networkError();

    await store.dispatch(fetchWishes());
    const state = store.getState();
    expect(state.wishes.wishes).toEqual([]);
    expect(state.wishes.isLoading).toBe(false);
  });

  it("addWish dispatches fulfilled action when a wish is added", async () => {
    const store = configureStore({ reducer: { wishes: wishListSlice } });
    const newWish = {
      id: 2,
      product: {
        id: 2,
        name: "Product2",
        images: [],
        stockQuantity: 5,
        price: 200,
      },
      user: { name: "User2", userName: "user2", email: "user2@test.com" },
    };
    mock.onPost(`/wishes`).reply(200, newWish);

    await store.dispatch(addWish({ productId: 2 }));
    const state = store.getState();
    expect(state.wishes.wishes).toContainEqual(newWish);
    expect(state.wishes.isLoading).toBe(false);
    expect(state.wishes.error).toBeNull();
  });

  it("addWish dispatches rejected action on failed request", async () => {
    const store = configureStore({ reducer: { wishes: wishListSlice } });
    mock.onPost(`/wishes`).reply(500, { message: "Internal Server Error" });

    await store.dispatch(addWish({ productId: 999 }));
    const state = store.getState();
    expect(state.wishes.isLoading).toBe(false);
    expect(state.wishes.error).toEqual("Internal Server Error");
  });

  it("deleteWish dispatches fulfilled action when a wish is removed", async () => {
    const store = configureStore({ reducer: { wishes: wishListSlice } });
    mock.onDelete(`/products/2/wishes`).reply(200);

    await store.dispatch(deleteWish({ productId: 2 }));
    const state = store.getState();
    expect(state.wishes.wishes).not.toContainEqual(
      expect.objectContaining({ id: 2 }),
    );
    expect(state.wishes.isLoading).toBe(false);
    expect(state.wishes.error).toBeNull();
  });

  it("deleteWish dispatches rejected action on failed request", async () => {
    const store = configureStore({ reducer: { wishes: wishListSlice } });
    mock.onDelete(`/products/999/wishes`).reply(404, { message: "Not Found" });

    await store.dispatch(deleteWish({ productId: 999 }));
    const state = store.getState();
    expect(state.wishes.isLoading).toBe(false);
    expect(state.wishes.error).toEqual("Not Found");
  });
});
