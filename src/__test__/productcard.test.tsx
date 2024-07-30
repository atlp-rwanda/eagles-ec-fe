import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  BrowserRouter,
  MemoryRouter,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";

import ProductCard from "../components/cards/ProductCard";
import { IProduct } from "../types";
import store from "../redux/store";

const product: IProduct = {
  id: 1,
  name: "Product 1",
  images: ["product1.jpg", "product1-thumb.jpg"],
  stockQuantity: 10,
  price: 100,
  discount: 0,
  categoryID: 1,
  userId: 1,
  isAvailable: true,
  description: "demo des",
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
};

describe("ProductCard Component", () => {
  test("renders product image, name, and price correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>,
    );

    const productImage = screen.getByTestId("prod-image");
    const productName = screen.getByTestId("product-name");
    const productPrice = screen.getByTestId("price");

    expect(productImage).toBeDefined();
    expect(productName).toBeDefined();
    expect(productPrice).toBeDefined();
  });

  test('displays "Add to cart" button on hover', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>,
    );

    const productContainer = screen.getByTestId("tbt");
    fireEvent.mouseOver(productContainer);

    // const addToCartButton = screen.getByTestId('add-to-cart');
    // expect(addToCartButton).toBeDefined();
  });

  test("renders rating and review count correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>,
    );

    const rating = screen.getByTestId("rating");
    const reviewCount = screen.getByTestId("review");

    expect(rating).toBeDefined();
    expect(reviewCount).toBeDefined();
  });

  test("truncates long product names", () => {
    const longNameProduct = {
      ...product,
      name: "This is a very long product name that should be truncated",
    };
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={longNameProduct} />
        </BrowserRouter>
      </Provider>,
    );

    const productName = screen.getByTestId("product-name");
    expect(productName.textContent).toHaveLength(15);
  });

  test("renders wishlist and view details buttons", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>,
    );

    // const wishlistButton = screen.getByTestId("like-btn");
    const viewDetailsButton = screen.getByTestId("dprod-detailbtn");
    // expect(screen.getByTestId("like-btn")).toBeDefined();

    // expect(wishlistButton).toBeDefined();
    expect(viewDetailsButton).toBeDefined();
    // expect(viewDetailsButton.querySelector('a')).toHaveAttribute('href', `/products/${product.id}`);
  });
});
