import "@testing-library/jest-dom";
import { performLogout } from "../utils/logoutUtils";
import api from "../redux/api/api";

// Mock the API and localStorage
jest.mock("../redux/api/api");
const mockPost = api.post as jest.MockedFunction<typeof api.post>;

describe("performLogout", () => {
  let consoleErrorMock: jest.SpyInstance;
  beforeAll(() => {
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  beforeEach(() => {
    localStorage.clear();
    mockPost.mockReset();
    consoleErrorMock.mockClear();
  });

  it("should perform logout successfully", async () => {
    localStorage.setItem("accessToken", "mockToken");
    mockPost.mockResolvedValue({});

    await performLogout();

    expect(mockPost).toHaveBeenCalledWith(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer mockToken`,
          Accept: "*/*",
        },
      },
    );
    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(window.location.href.startsWith("http")).toBe(true);
  });

  it("should handle logout failure", async () => {
    localStorage.setItem("accessToken", "mockToken");
    const error = new Error("Network error");
    mockPost.mockRejectedValue(error);

    await performLogout();

    expect(mockPost).toHaveBeenCalledWith(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer mockToken`,
          Accept: "*/*",
        },
      },
    );
    expect(console.error).toHaveBeenCalledWith("Failed to logout:", error);
  });

  it("should not call API if accessToken is missing", async () => {
    await performLogout();

    expect(mockPost).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });
});
