import {
  updateProfile,
  updateProfileSlice,
} from "../redux/reducers/updateProfileSlice";

const { reducer } = updateProfileSlice;
describe("profile update slice", () => {
  it("handles pending state on profile update.pending", () => {
    // @ts-ignore
    const initialState = reducer(undefined, { type: updateProfile.pending });
    expect(initialState.loading).toBeTruthy();
  });

  it("handles fulfilled state and data on profile update.fulfilled", () => {
    const mockData = { message: "Success" };
    const initialState = reducer(undefined, {
      // @ts-ignore
      type: updateProfile.fulfilled,
      payload: mockData,
    });
    expect(initialState.profile).toBe(undefined);
  });

  it("handles rejected state and error on profile update.rejected", () => {
    const error = { message: "Error" };
    const initialState = reducer(undefined, {
      // @ts-ignore
      type: updateProfile.rejected,
      payload: error,
    });
    expect(initialState.error).toBe(error);
  });
});
