import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { IProduct } from "../types";
import FeaturedProducts from "../components/common/featured-products/FeaturedProducts";
import * as queries from "../libs/queries";

import dummyProducts from "./__mock__/product";

jest.mock("../libs/queries", () => ({
  useFetchProducts: jest.fn(),
}));

describe("FeaturedProducts Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it("should render error message when there is an error", () => {
    (queries.useFetchProducts as jest.Mock).mockReturnValue({
      data: [],
      isPending: false,
      error: { message: "Error fetching products" },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FeaturedProducts />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Error fetching products")).toBeInTheDocument();
    expect(
      screen.queryByTestId("product-card-skeleton"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("no product found")).not.toBeInTheDocument();
    dummyProducts.forEach((product) => {
      expect(screen.queryByText(product.name)).not.toBeInTheDocument();
    });
  });

  it("should render loading skeleton while fetching products", () => {
    (queries.useFetchProducts as jest.Mock).mockReturnValue({
      data: [],
      isPending: true,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FeaturedProducts />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId("product-card-skeleton")).toBeInTheDocument();
    expect(
      screen.queryByText("Error fetching products"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("no product found")).not.toBeInTheDocument();
    dummyProducts.forEach((product) => {
      expect(screen.queryByText(product.name)).not.toBeInTheDocument();
    });
  });

  it('should render "no product found" message when data is empty', () => {
    (queries.useFetchProducts as jest.Mock).mockReturnValue({
      data: [],
      isPending: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FeaturedProducts />
      </QueryClientProvider>,
    );

    expect(screen.getByText("no product found")).toBeInTheDocument();
    expect(
      screen.queryByText("Error fetching products"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("product-card-skeleton"),
    ).not.toBeInTheDocument();
    dummyProducts.forEach((product) => {
      expect(screen.queryByText(product.name)).not.toBeInTheDocument();
    });
  });

  it("should render products when data is fetched successfully", () => {
    (queries.useFetchProducts as jest.Mock).mockReturnValue({
      data: dummyProducts,
      isPending: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FeaturedProducts />
      </QueryClientProvider>,
    );

    dummyProducts.forEach((product) => {
      expect(screen.getByTestId("tbt")).toBeInTheDocument();
    });

    expect(
      screen.queryByText("Error fetching products"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("product-card-skeleton"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("no product found")).not.toBeInTheDocument();
  });
});
