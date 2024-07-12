import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

import paymentSlice, {
  makePayment,
  handleSuccess,
} from "../redux/reducers/payment";

jest.mock("../redux/api/api", () => ({
  api: {
    interceptors: {
      response: {
        use: jest.fn(),
      },
      request: {
        use: jest.fn(),
      },
    },
  },
}));

jest.mock("axios");

describe("paymentSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        payment: paymentSlice,
      },
    });
  });

  it("handles successful makePayment", async () => {
    const mockResponse = { data: { status: "success" } };
    // @ts-ignore
    axios.post.mockResolvedValueOnce(mockResponse);

    await store.dispatch(
      makePayment({
        amount: 100,
      }),
    );

    const state = store.getState();
    expect(state.payment.loading).toBe(false);
  });

  it("handles failed makePayment", async () => {
    console.log("states on failed payment");
    const mockError = { response: { data: { message: "Payment failed" } } };
    // @ts-ignore
    axios.post.mockRejectedValueOnce(mockError);

    await store.dispatch(
      makePayment({
        amount: 100,
      }),
    );

    const state = store.getState();

    expect(state.payment.loading).toBe(false);
  });

  it("handles successful handleSuccess", async () => {
    const mockResponse = { data: { status: "success" } };
    // @ts-ignore
    axios.get.mockResolvedValueOnce(mockResponse);

    await store.dispatch(
      handleSuccess({
        sessionId: "testSessionId",
        userId: "testUserId",
      }),
    );

    const state = store.getState();
    expect(state.payment.loading).toBe(false);
  });

  it("handles failed handleSuccess", async () => {
    const mockError = {
      response: { data: { message: "handleSuccess failed" } },
    };
    // @ts-ignore
    axios.get.mockRejectedValueOnce(mockError);

    await store.dispatch(
      handleSuccess({
        sessionId: "testSessionId",
        userId: "testUserId",
      }),
    );

    const state = store.getState();
    expect(state.payment.loading).toBe(false);
  });
});
