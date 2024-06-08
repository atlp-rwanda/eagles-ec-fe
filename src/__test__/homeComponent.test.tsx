import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Homepage from "../pages/Homepage";

test("demo", () => {
  expect(true).toBe(true);
});

describe("Testing React components", () => {
  it("should render home page componets", () => {
    render(<Homepage />);
    expect(true).toBeTruthy();
  });
});
