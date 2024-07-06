import { verifyOtp, otpVerificationApiSlice } from "../redux/api/otpApiSclice";

const { reducer } = otpVerificationApiSlice;
describe("otpVerification slice", () => {
  it("handles pending state on verifyOtp.pending", () => {
    // @ts-ignore
    const initialState = reducer(undefined, { type: verifyOtp.pending });
    expect(initialState.loading).toBeTruthy();
  });

  it("handles fulfilled state and data on verifyOtp.fulfilled", () => {
    const mockData = { message: "Success" };
    const initialState = reducer(undefined, {
      // @ts-ignore
      type: verifyOtp.fulfilled,
      payload: mockData,
    });
    expect(initialState.success).toBeTruthy();
  });

  it("handles rejected state and error on verifyOtp.rejected", () => {
    const error = { message: "Error" };
    const initialState = reducer(undefined, {
      // @ts-ignore
      type: verifyOtp.rejected,
      payload: error,
    });
    expect(initialState.error).toBe("Error");
  });
});
