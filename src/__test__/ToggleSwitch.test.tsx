import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import ToggleSwitch from "../components/dashboard/ToggleSwitch";

describe("ToggleSwitch component", () => {
  test("renders ToggleSwitch in unchecked state", () => {
    render(<ToggleSwitch checked={false} onChange={jest.fn()} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("renders ToggleSwitch in checked state", () => {
    render(<ToggleSwitch checked onChange={jest.fn()} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("calls onChange when ToggleSwitch is clicked", () => {
    const handleChange = jest.fn();
    render(<ToggleSwitch checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
