import { configureStore } from "@reduxjs/toolkit";

import sellerStatsReducer, { fetchStats } from "../redux/reducers/sellerStats";

describe("sellerStats slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        sellerStatistics: sellerStatsReducer,
      },
    });
  });

  it("should handle initial state", () => {
    const { sellerStatistics } = store.getState();
    expect(sellerStatistics).toEqual({
      loading: false,
      data: [],
      error: null,
    });
  });

  it("should handle fetchStats.pending", () => {
    store.dispatch(fetchStats.pending("sellerStatistics"));
    const { sellerStatistics } = store.getState();
    expect(sellerStatistics.loading).toBe(true);
  });

  it("should handle fetchStats.fulfilled", () => {
    const stats = [{ id: 1 }, { id: 2 }];
    store.dispatch(fetchStats.fulfilled(stats, "sellerStatistics"));
    const { sellerStatistics } = store.getState();
    expect(sellerStatistics.loading).toBe(false);
    expect(sellerStatistics.data).toEqual(stats);
  });

  it("should handle fetchStats.rejected", () => {
    const error = new Error("Error message");
    store.dispatch(fetchStats.rejected(error, "sellerStatistics"));
    const { sellerStatistics } = store.getState();
    expect(sellerStatistics.loading).toBe(false);
    expect(sellerStatistics.error).toBe(error.message);
  });
});
