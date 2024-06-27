import { render, screen } from "@testing-library/react";

import { getProfile, profileSlice } from "../redux/reducers/profileSlice";
import "@testing-library/jest-dom";
import DisplayProfileData from "../components/profile/getProfile";

const { reducer } = profileSlice;

describe("get profile sclice", () => {
  it("handles pending state on profile .pending", () => {
    // @ts-ignore
    const initialState = reducer(undefined, { type: getProfile.pending });
    expect(initialState.loading).toBeTruthy();
  });

  it("handles fulfilled state and data on profile .fulfilled", () => {
    const mockData = { message: "Success" };
    const initialState = reducer(undefined, {
      // @ts-ignore
      type: getProfile.fulfilled,
      payload: mockData,
    });
    expect(initialState.profile).toBe(mockData);
  });

  it("handles rejected state and error on profile .rejected", () => {
    const error = { message: "Error" };
    const initialState = reducer(undefined, {
      // @ts-ignore
      type: getProfile.rejected,
      payload: error,
    });
    expect(initialState.error).toBe("Error");
  });
});

describe("DisplayProfileData component", () => {
  it("renders the label and value correctly", () => {
    const label = "Name";
    const value = "John Doe";

    render(<DisplayProfileData label={label} value={value} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("handles number values correctly", () => {
    const label = "Age";
    const value = 30;

    render(<DisplayProfileData label={label} value={value} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(value.toString())).toBeInTheDocument();
  });
});
