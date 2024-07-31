import api from "../redux/api/api";
import { ICurrentUser } from "../redux/reducers/notificationSlice";
import { getCurrentUser } from "../utils/currentuser";

jest.mock("../redux/api/api");

const mockUser: ICurrentUser = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  password: "securepassword",
  lastPasswordUpdateTime: new Date("2023-01-01T00:00:00Z"),
  roleId: 2,
  isActive: true,
  isVerified: true,
  createdAt: new Date("2022-01-01T00:00:00Z"),
  updatedAt: new Date("2023-01-01T00:00:00Z"),
};

describe("getCurrentUser", () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockReset();
  });

  it("should return user data when API call is successful", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockUser });

    const result = await getCurrentUser();

    expect(result).toEqual(mockUser);
  });

  it("should return null when API call fails", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const result = await getCurrentUser();

    expect(result).toBeNull();
  });
});
