import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";

import DataTable from "../components/dashboard/admin/DataTable";
import SearchFilterBar from "../components/dashboard/admin/SearchFilterBar";
import UserRoleSelect from "../components/dashboard/admin/UserRoleSelect";

const mockAxios = new MockAdapter(axios);

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    roleId: 1,
    isActive: true,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    roleId: 2,
    isActive: false,
  },
];

const mockRoles = [
  { id: 1, name: "Buyer" },
  { id: 2, name: "Seller" },
];

beforeEach(() => {
  mockAxios.reset();
});

test("renders loading skeleton and fetches data", async () => {
  mockAxios.onGet("/users").reply(200, { users: mockUsers });
  mockAxios.onGet("/roles").reply(200, { roles: mockRoles });

  render(
    <MemoryRouter>
      <DataTable />
    </MemoryRouter>,
  );

  const skeletonRows = await screen.findAllByTestId("skeleton-loader");
  expect(skeletonRows).toHaveLength(5);
});

describe("SearchFilterBar component", () => {
  const roles = [
    { id: 1, name: "Role 1" },
    { id: 2, name: "Role 2" },
    { id: 3, name: "Role 3" },
  ];

  it("renders search input and filter dropdown", () => {
    render(
      <SearchFilterBar onSearch={() => {}} onFilter={() => {}} roles={roles} />,
    );

    const searchInput = screen.getByPlaceholderText("Search name, email...");
    const filterDropdown = screen.getByRole("combobox", { name: "" });

    expect(searchInput).toBeInTheDocument();
    expect(filterDropdown).toBeInTheDocument();
  });

  it("calls onSearch when typing in search input", () => {
    const mockSearch = jest.fn();
    render(
      <SearchFilterBar
        onSearch={mockSearch}
        onFilter={() => {}}
        roles={roles}
      />,
    );

    const searchInput = screen.getByPlaceholderText("Search name, email...");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith("test");
  });

  it("calls onFilter when selecting an option from filter dropdown", () => {
    const mockFilter = jest.fn();
    render(
      <SearchFilterBar
        onSearch={() => {}}
        onFilter={mockFilter}
        roles={roles}
      />,
    );

    const filterDropdown = screen.getByRole("combobox", { name: "" });
    fireEvent.change(filterDropdown, { target: { value: "2" } });

    expect(mockFilter).toHaveBeenCalledTimes(1);
    expect(mockFilter).toHaveBeenCalledWith("2");
  });
});

test("should change role on select change", () => {
  const user = { id: 1, roleId: 2 };
  const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "User" },
    { id: 3, name: "Guest" },
  ];
  const loadingAction = {};
  const loading = false;
  const handleRoleChange = jest.fn();

  render(
    <UserRoleSelect
      user={user}
      roles={roles}
      handleRoleChange={handleRoleChange}
      loadingAction={loadingAction}
      loading={loading}
    />,
  );

  const selectElement = screen.getByTestId("role-select-1");
  expect(selectElement).toBeInTheDocument();
  fireEvent.mouseDown(selectElement);
  const newRole = screen.getByText("User");
  expect(newRole).toBeInTheDocument();
});
