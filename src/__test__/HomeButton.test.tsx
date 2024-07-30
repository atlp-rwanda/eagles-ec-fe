import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import HomeButton from "../components/dashboard/HomeButton";

describe("HomeButton", () => {
  it("should render the Home button", () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <Routes>
          <Route path="/test" element={<HomeButton />} />
        </Routes>
      </MemoryRouter>,
    );

    const homeButton = screen.getByText("Home");
    expect(homeButton).toBeInTheDocument();
  });
});
