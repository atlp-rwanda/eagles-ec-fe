import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import paymentReducer, {
  makePayment,
  handleSuccess,
} from "../redux/reducers/payment";

/* eslint-disable @typescript-eslint/default-param-last */
jest.mock("../redux/reducers/payment", () => ({
  __esModule: true,
  makePayment: jest
    .fn()
    .mockImplementation(() => ({ type: "mockMakePayment" })),
  handleSuccess: jest
    .fn()
    .mockImplementation(() => ({ type: "mockHandleSuccess" })),
  default: jest.fn().mockImplementation((state = {}, action) => {
    switch (action.type) {
      case "mockMakePayment":
      case "mockHandleSuccess":
        return {
          ...state,
          loading: false,
          data: { status: "success" },
          error: null,
        };
      default:
        return state;
    }
  }),
}));

describe("payment slice", () => {
  let store;
  let mockAxios;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        payment: paymentReducer,
      },
    });

    mockAxios = new MockAdapter(axios);
  });

  it("should handle makePayment", async () => {
    const paymentData = { amount: 100 };
    const mockResponse = { status: "success" };

    mockAxios.onPost("/payment/checkout", paymentData).reply(200, mockResponse);

    // const makePayment = require("../redux/reducers/payment").makePayment;
    await store.dispatch(makePayment(paymentData));

    const state = store.getState();
    expect(state.payment.loading).toBe(false);
    expect(state.payment.data).toEqual(mockResponse);
  });
  it("should handle handleSuccess", async () => {
    const mockResponse = { sessionId: "testSessionId", userId: "testUserId" };

    // const handleSuccess = require("../redux/reducers/payment").handleSuccess;
    await store.dispatch(handleSuccess(mockResponse));

    const state = store.getState();
    expect(state.payment.loading).toBe(false);
    expect(state.payment.data).toEqual({ status: "success" });
    expect(state.payment.error).toBe(null);
  });
});
