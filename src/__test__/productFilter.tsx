// @ts-nocheck
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProductFilter from "../components/common/filter/ProductFilter";
import { IProduct } from "../types";

import dummyProducts from "./__mock__/product";

const priceRanges = [
  { label: "All", value: [0, Infinity] },
  { label: "30000 RWF - 60000 RWF", value: [30000, 60000] },
  { label: "60000 RWF - 90000 RWF", value: [60000, 90000] },
  { label: "90000 RWF - 120000 RWF", value: [90000, 120000] },
];

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe("Product Filter Component", () => {
  let onFilter: jest.Mock;

  beforeEach(() => {
    onFilter = jest.fn();
  });

  it("renders sorting options", () => {
    renderWithQueryClient(
      <ProductFilter products={dummyProducts} onFilter={onFilter} />,
    );

    expect(screen.getByText("SORT BY")).toBeInTheDocument();
    expect(screen.getByLabelText("Popularity")).toBeInTheDocument();
    expect(screen.getByLabelText("Newness")).toBeInTheDocument();
    expect(screen.getByLabelText("Price: Low to high")).toBeInTheDocument();
    expect(screen.getByLabelText("Price: High to low")).toBeInTheDocument();
  });

  it("renders price filter options", () => {
    renderWithQueryClient(
      <ProductFilter products={dummyProducts} onFilter={onFilter} />,
    );

    expect(screen.getByText("PRICE FILTER")).toBeInTheDocument();
    priceRanges.forEach((range) => {
      expect(screen.getByLabelText(range.label)).toBeInTheDocument();
    });
  });

  it("renders category filter options", async () => {
    renderWithQueryClient(
      <ProductFilter products={dummyProducts} onFilter={onFilter} />,
    );

    expect(await screen.findByText("Filter By Category")).toBeInTheDocument();
    expect(await screen.findByText("Category 1")).toBeInTheDocument();
    expect(await screen.findByText("Category 2")).toBeInTheDocument();
  });

  it("filters products by name query", () => {
    renderWithQueryClient(
      <ProductFilter products={dummyProducts} onFilter={onFilter} />,
    );

    fireEvent.change(screen.getByPlaceholderText("Search products"), {
      target: { value: "Product 1" },
    });

    expect(onFilter).toHaveBeenCalledWith([
      {
        id: 1,
        name: "Product 1",
        price: 100,
        discount: 0,
        images: ["product1.jpg", "product1-thumb.jpg"],
        stockQuantity: 10,
        categoryID: 1,
        userId: 1,
        isAvailable: true,
        expiryDate: "2024-12-31",
        createdAt: "2024-06-20T12:00:00Z",
        updatedAt: "2024-06-20T12:00:00Z",
        category: {
          id: 1,
          name: "Category 1",
          description: "Description of Category 1",
          image: "category1.jpg",
          createdAt: "2024-06-20T12:00:00Z",
          updatedAt: "2024-06-20T12:00:00Z",
        },
        user: {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john.doe@example.com",
        },
      },
    ]);
  });

  it("filters products by price range", () => {
    renderWithQueryClient(
      <ProductFilter products={dummyProducts} onFilter={onFilter} />,
    );

    fireEvent.click(screen.getByLabelText("60000 RWF - 90000 RWF"));

    expect(onFilter).toHaveBeenCalledWith([
      {
        id: 2,
        name: "Product 2",
        price: 150,
        discount: 10,
        images: ["product2.jpg", "product2-thumb.jpg"],
        stockQuantity: 5,
        categoryID: 2,
        userId: 2,
        isAvailable: false,
        expiryDate: "2024-11-30",
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        category: {
          id: 2,
          name: "Category 2",
          description: "Description of Category 2",
          image: "category2.jpg",
          createdAt: "2024-06-19T12:00:00Z",
          updatedAt: "2024-06-19T12:00:00Z",
        },
        user: {
          id: 2,
          name: "Jane Smith",
          username: "janesmith",
          email: "jane.smith@example.com",
        },
      },
    ]);
  });

  it("filters products by category", async () => {
    renderWithQueryClient(
      <ProductFilter products={dummyProducts} onFilter={onFilter} />,
    );

    fireEvent.change(await screen.findByLabelText("Category"), {
      target: { value: ["Category 1"] },
    });

    expect(onFilter).toHaveBeenCalledWith([
      {
        id: 1,
        name: "Product 1",
        price: 100,
        discount: 0,
        images: ["product1.jpg", "product1-thumb.jpg"],
        stockQuantity: 10,
        categoryID: 1,
        userId: 1,
        isAvailable: true,
        expiryDate: "2024-12-31",
        createdAt: "2024-06-20T12:00:00Z",
        updatedAt: "2024-06-20T12:00:00Z",
        category: {
          id: 1,
          name: "Category 1",
          description: "Description of Category 1",
          image: "category1.jpg",
          createdAt: "2024-06-20T12:00:00Z",
          updatedAt: "2024-06-20T12:00:00Z",
        },
        user: {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john.doe@example.com",
        },
      },
      {
        id: 3,
        name: "Product 3",
        price: 75,
        discount: 5,
        images: ["product3.jpg", "product3-thumb.jpg"],
        stockQuantity: 20,
        categoryID: 1,
        userId: 1,
        isAvailable: true,
        expiryDate: "2025-01-15",
        createdAt: "2024-06-18T12:00:00Z",
        updatedAt: "2024-06-18T12:00:00Z",
        category: {
          id: 1,
          name: "Category 1",
          description: "Description of Category 1",
          image: "category1.jpg",
          createdAt: "2024-06-20T12:00:00Z",
          updatedAt: "2024-06-20T12:00:00Z",
        },
        user: {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john.doe@example.com",
        },
      },
    ]);
  });

  it("sorts products by price", () => {
    renderWithQueryClient(
      <ProductFilter products={dummyProducts} onFilter={onFilter} />,
    );

    fireEvent.click(screen.getByLabelText("Price: Low to high"));

    expect(onFilter).toHaveBeenCalledWith([
      {
        id: 3,
        name: "Product 3",
        price: 75,
        discount: 5,
        images: ["product3.jpg", "product3-thumb.jpg"],
        stockQuantity: 20,
        categoryID: 1,
        userId: 1,
        isAvailable: true,
        expiryDate: "2025-01-15",
        createdAt: "2024-06-18T12:00:00Z",
        updatedAt: "2024-06-18T12:00:00Z",
        category: {
          id: 1,
          name: "Category 1",
          description: "Description of Category 1",
          image: "category1.jpg",
          createdAt: "2024-06-20T12:00:00Z",
          updatedAt: "2024-06-20T12:00:00Z",
        },
        user: {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john.doe@example.com",
        },
      },
      {
        id: 1,
        name: "Product 1",
        price: 100,
        discount: 0,
        images: ["product1.jpg", "product1-thumb.jpg"],
        stockQuantity: 10,
        categoryID: 1,
        userId: 1,
        isAvailable: true,
        expiryDate: "2024-12-31",
        createdAt: "2024-06-20T12:00:00Z",
        updatedAt: "2024-06-20T12:00:00Z",
        category: {
          id: 1,
          name: "Category 1",
          description: "Description of Category 1",
          image: "category1.jpg",
          createdAt: "2024-06-20T12:00:00Z",
          updatedAt: "2024-06-20T12:00:00Z",
        },
        user: {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john.doe@example.com",
        },
      },
      {
        id: 2,
        name: "Product 2",
        price: 150,
        discount: 10,
        images: ["product2.jpg", "product2-thumb.jpg"],
        stockQuantity: 5,
        categoryID: 2,
        userId: 2,
        isAvailable: false,
        expiryDate: "2024-11-30",
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        category: {
          id: 2,
          name: "Category 2",
          description: "Description of Category 2",
          image: "category2.jpg",
          createdAt: "2024-06-19T12:00:00Z",
          updatedAt: "2024-06-19T12:00:00Z",
        },
        user: {
          id: 2,
          name: "Jane Smith",
          username: "janesmith",
          email: "jane.smith@example.com",
        },
      },
    ]);

    fireEvent.click(screen.getByLabelText("Price: High to low"));

    expect(onFilter).toHaveBeenCalledWith([
      {
        id: 2,
        name: "Product 2",
        price: 150,
        discount: 10,
        images: ["product2.jpg", "product2-thumb.jpg"],
        stockQuantity: 5,
        categoryID: 2,
        userId: 2,
        isAvailable: false,
        expiryDate: "2024-11-30",
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        category: {
          id: 2,
          name: "Category 2",
          description: "Description of Category 2",
          image: "category2.jpg",
          createdAt: "2024-06-19T12:00:00Z",
          updatedAt: "2024-06-19T12:00:00Z",
        },
        user: {
          id: 2,
          name: "Jane Smith",
          username: "janesmith",
          email: "jane.smith@example.com",
        },
      },
      {
        id: 1,
        name: "Product 1",
        price: 100,
        discount: 0,
        images: ["product1.jpg", "product1-thumb.jpg"],
        stockQuantity: 10,
        categoryID: 1,
        userId: 1,
        isAvailable: true,
        expiryDate: "2024-12-31",
        createdAt: "2024-06-20T12:00:00Z",
        updatedAt: "2024-06-20T12:00:00Z",
        category: {
          id: 1,
          name: "Category 1",
          description: "Description of Category 1",
          image: "category1.jpg",
          createdAt: "2024-06-20T12:00:00Z",
          updatedAt: "2024-06-20T12:00:00Z",
        },
        user: {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john.doe@example.com",
        },
      },
      {
        id: 3,
        name: "Product 3",
        price: 75,
        discount: 5,
        images: ["product3.jpg", "product3-thumb.jpg"],
        stockQuantity: 20,
        categoryID: 1,
        userId: 1,
        isAvailable: true,
        expiryDate: "2025-01-15",
        createdAt: "2024-06-18T12:00:00Z",
        updatedAt: "2024-06-18T12:00:00Z",
        category: {
          id: 1,
          name: "Category 1",
          description: "Description of Category 1",
          image: "category1.jpg",
          createdAt: "2024-06-20T12:00:00Z",
          updatedAt: "2024-06-20T12:00:00Z",
        },
        user: {
          id: 1,
          name: "John Doe",
          username: "johndoe",
          email: "john.doe@example.com",
        },
      },
    ]);
  });
});
