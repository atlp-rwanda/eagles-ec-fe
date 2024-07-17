import { configureStore, Tuple } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";

import api from "../redux/api/api";
import reviewSlice, {
  fetchReviews,
  addReview,
  deleteReview,
  updateReview,
} from "../redux/reducers/reviewSlice";

const mockApi = new MockAdapter(api);
const mockStore = (initialState) =>
  configureStore({
    reducer: {
      // @ts-ignore
      review: reviewSlice,
    },
    preloadedState: initialState,
  });

describe("Review Slice Thunks", () => {
  let store;

  beforeEach(() => {
    mockApi.reset();
    store = mockStore({
      review: {
        reviews: [],
        isLoading: false,
        error: null,
      },
    });
  });

  it("should handle fetchReviews pending", async () => {
    mockApi.onGet("/products/productId/reviews").reply(200, []);

    store.dispatch(fetchReviews({ productId: "productId" }));
    expect(store.getState().review.isLoading).toBe(true);
  });
  it("should handle fetchReviews fulfilled", async () => {
    const mockData = [
      {
        id: "1",
        productId: "productId",
        user: { id: 1, name: "John" },
        rating: "5",
        feedback: "Great!",
      },
    ];
    mockApi
      .onGet("/products/productId/reviews")
      .reply(200, { reviewProduct: mockData });

    await store.dispatch(fetchReviews({ productId: "productId" }));

    expect(store.getState().review.reviews).toEqual(mockData);
    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBe(null);
  });

  it("should handle fetchReviews rejected", async () => {
    mockApi.onGet("/products/productId/reviews").reply(500);

    await store.dispatch(fetchReviews({ productId: "productId" }));

    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBe(
      "Request failed with status code 500",
    );
  });

  it("should handle fetchReviews axios error", async () => {
    mockApi
      .onGet("/products/productId/reviews")
      .reply(500, { message: "Server error" });

    await store.dispatch(fetchReviews({ productId: "productId" }));
    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBe(
      "Request failed with status code 500",
    );
  });

  it("should handle addReview fulfilled", async () => {
    const mockData = {
      id: "3",
      productId: "productId",
      user: { id: 3, name: "bwiza" },
      rating: "4",
      feedback: "Good!",
    };
    mockApi.onPost("/products/productId/reviews").reply(200, mockData);

    await store.dispatch(
      addReview({ productId: "productId", rating: "4", feedback: "loop it" }),
    );
    expect(store.getState().review.reviews).toContainEqual(mockData);
    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBe(null);
  });

  it("should handle addReview axios error", async () => {
    mockApi
      .onPost("/products/prod1/reviews")
      .reply(500, { message: "Add review failed" });

    await store.dispatch(
      addReview({ productId: "prod1", rating: "4", feedback: "Good!" }),
    );

    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBeTruthy();
  });

  it("should handle deleteReview fulfilled", async () => {
    const initialState = {
      review: {
        reviews: [
          {
            id: "2",
            productId: "productId",
            user: { id: 2, name: "bwiza" },
            rating: "4",
            feedback: "Good!",
          },
        ],
        isLoading: false,
        error: null,
      },
    };
    store = mockStore(initialState);
    mockApi.onDelete("/products/productId/reviews").reply(200);
    // @ts-ignore
    await store.dispatch(deleteReview({ productId: "productId", id: "2" }));
    expect(store.getState().review.reviews).toEqual([]);
    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBe(null);
  });
  it("should handle updateReview fulfilled", async () => {
    const initialState = {
      review: {
        reviews: [
          {
            id: "2",
            productId: "productId",
            user: { id: 2, name: "bwiza" },
            rating: "4",
            feedback: "loop it",
          },
        ],
        isLoading: false,
        error: null,
      },
    };
    store = mockStore(initialState);
    const updatedReview = {
      id: "2",
      productId: "productId",
      user: { id: 2, name: "Jane" },
      rating: "5",
      feedback: "loop througth!",
    };
    mockApi.onPatch("/products/productId/reviews").reply(200, updatedReview);
    await store.dispatch(
      updateReview({
        productId: "productId",
        id: 2,
        rating: "5",
        feedback: "loop througth!",
      }),
    );

    expect(store.getState().review.reviews).toContainEqual(updatedReview);
    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBe(null);
  });

  it("should handle deleteReview axios error", async () => {
    mockApi
      .onDelete("/products/prod1/reviews")
      .reply(500, { message: "Delete review failed" });
    // @ts-ignore
    await store.dispatch(deleteReview({ productId: "prod1", id: "2" }));
    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBeTruthy();
  });

  it("should handle updateReview axios error", async () => {
    mockApi
      .onPatch("/products/prod1/reviews")
      .reply(500, { message: "Update review failed" });
    // @ts-ignore
    await store.dispatch(
      updateReview({
        productId: "prod1",
        id: 2,
        rating: "5",
        feedback: "Excellent!",
      }),
    );
    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBeTruthy();
  });

  it("should handle axios network error", async () => {
    mockApi.onGet("/products/prod1/reviews").networkError();

    await store.dispatch(fetchReviews({ productId: "prod1" }));
    expect(store.getState().review.isLoading).toBe(false);
    expect(store.getState().review.error).toBe("Network Error");
  });
});
