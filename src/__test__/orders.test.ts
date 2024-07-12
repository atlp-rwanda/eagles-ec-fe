import { orders } from "../../type";
import ordersReducer, {
  fetchOrders,
  updateOrderStatus,
} from "../redux/reducers/ordersSlice";

describe("orders reducer", () => {
  const initialState = {
    isLoading: false,
    data: [] as unknown as orders,
    error: false,
  };

  it("should handle initial state", () => {
    expect(ordersReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle fetchOrders.pending", () => {
    const action = { type: fetchOrders.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle fetchOrders.fulfilled", () => {
    const mockOrders = [
      { id: 1, status: "pending" },
      { id: 2, status: "completed" },
    ];
    const action = { type: fetchOrders.fulfilled.type, payload: mockOrders };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      data: mockOrders,
    });
  });

  it("should handle fetchOrders.rejected", () => {
    const action = { type: fetchOrders.rejected.type };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: true,
    });
  });

  it("should handle updateOrderStatus.pending", () => {
    const action = { type: updateOrderStatus.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle updateOrderStatus.rejected", () => {
    const action = { type: updateOrderStatus.rejected.type };
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: true,
    });
  });

  it("should handle updateOrderStatus.fulfilled", () => {
    const initialStateWithData: any = {
      ...initialState,
      data: [
        {
          order: { id: 1 },
          products: [
            { id: 101, status: "pending" },
            { id: 102, status: "pending" },
          ],
        },
        {
          order: { id: 2 },
          products: [{ id: 201, status: "pending" }],
        },
      ],
    };

    const action = {
      type: updateOrderStatus.fulfilled.type,
      payload: { orderId: 1, productId: 102, status: "completed" },
    };

    const state = ordersReducer(initialStateWithData, action);

    expect(state.data[0].products[1].status).toEqual("completed");
    expect(state.data[0].products[0].status).toEqual("pending");
    expect(state.data[1].products[0].status).toEqual("pending");
  });
});
