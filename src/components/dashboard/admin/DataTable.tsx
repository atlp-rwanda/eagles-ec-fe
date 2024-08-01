import React, { useEffect, useState } from "react";
import {
  FaRegBell, FaShoppingCart, FaStore, FaUsers,
} from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import api from "../../../redux/api/api";
import ToggleSwitch from "../ToggleSwitch";

import SearchFilterBar from "./SearchFilterBar";
import NumberCard from "./NumberCard";
import UserAvatar from "./UserAvatar";
import UserRoleSelect from "./UserRoleSelect";

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  isActive: boolean;
}

interface Role {
  id: number;
  name: string;
}

const DataTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("All");
  const [loadingAction, setLoadingAction] = useState<{
    [key: number]: boolean;
  }>({});
  const navigate = useNavigate();

  const fetchData = async () => {
    const authToken = localStorage.getItem("accessToken");

    try {
      const [usersResponse, rolesResponse] = await Promise.all([
        api.get("/users", {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${authToken}`,
          },
        }),
        api.get("/roles", {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${authToken}`,
          },
        }),
      ]);
      setUsers(sortUsersByEmail(usersResponse.data.users));
      setRoles(rolesResponse.data.roles);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error(`Error fetching users or roles: ${error.message}`);
        navigate("/");
      } else {
        toast.error(`Error fetching users or roles: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (role: string) => {
    setFilterRole(role);
  };

  const sortUsersByEmail = (users: User[]) =>
    users.sort((a, b) => a.email.localeCompare(b.email));

  const toggleActiveStatus = async (id: number) => {
    const authToken = localStorage.getItem("accessToken");
    setLoadingAction((prevState) => ({ ...prevState, [id]: true }));
    try {
      const response = await axios.patch(
        `${process.env.VITE_BASE_URL}/users/${id}/status`,
        null,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          (user.id === id ? { ...user, isActive: !user.isActive } : user)));
      toast.success("User status updated successfully");
    } catch (error: any) {
      toast.error(`Error toggling active status: ${error.message}`);
    } finally {
      setLoadingAction((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    setCurrentPage(pageNumber);
  };

  const changeRowsPerPage = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as number;
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleRoleChange = async (id: number, newRole: number) => {
    const authToken = localStorage.getItem("accessToken");
    setLoadingAction((prevState) => ({ ...prevState, [id]: true }));
    try {
      const response = await api.patch(
        `/users/${id}/role`,
        { roleId: newRole },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      toast.success(response.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          (user.id === id ? { ...user, roleId: newRole } : user)));
    } catch (error: any) {
      toast.error(`Error changing user role: ${error.message}`);
    } finally {
      setLoadingAction((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm = user.name.toLowerCase().includes(searchTerm.toLowerCase())
      || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilterRole = filterRole === "All" || user.roleId === Number(filterRole);
    return matchesSearchTerm && matchesFilterRole;
  });

  const numberOfUsers = filteredUsers.length;
  const numberOfSellers = filteredUsers.filter(
    (user) => user.roleId === 2,
  ).length;
  const numberOfBuyers = filteredUsers.filter(
    (user) => user.roleId === 1,
  ).length;

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const renderSkeletonRows = () =>
    Array.from({ length: rowsPerPage }).map((_, index) => (
      <TableRow
        key={index}
        className="bg-white border-b"
        data-testid="skeleton-loader"
      >
        <TableCell className="flex items-center">
          <Skeleton width={40} height={40} />
          <Skeleton className="ml-2" width="70%" />
        </TableCell>
        <TableCell>
          <Skeleton width={150} />
        </TableCell>
        <TableCell>
          <Skeleton width={100} />
        </TableCell>
        <TableCell>
          <Skeleton width={40} />
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      <ToastContainer />
      <div className="flex flex-wrap justify-between px-2 py-4 ">
        <NumberCard
          title="Users"
          number={numberOfUsers}
          Logo={FaUsers}
          loading={loading}
        />
        <NumberCard
          title="Sellers"
          number={numberOfSellers}
          Logo={FaStore}
          loading={loading}
        />
        <NumberCard
          title="Buyers"
          number={numberOfBuyers}
          Logo={FaShoppingCart}
          loading={loading}
        />
      </div>
      <SearchFilterBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        roles={roles}
      />
      <TableContainer
        component={Paper}
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <Table>
          <TableHead className="text-xs text-gray-700 uppercase bg-gray-100">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? renderSkeletonRows()
              : currentUsers.map((user: any) => (
                <TableRow key={user.id} className="bg-white border-b">
                  <TableCell className="flex items-center">
                    <UserAvatar
                      name={user.name}
                      imageUrl={user.imageUrl}
                      data-testid={`user-avatar-${user.id}`}
                    />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <UserRoleSelect
                      user={user}
                      roles={roles}
                      handleRoleChange={handleRoleChange}
                      loadingAction={loadingAction}
                      loading={loading}
                    />
                  </TableCell>
                  <TableCell>
                    <ToggleSwitch
                      checked={user.isActive}
                      onChange={() => toggleActiveStatus(user.id)}
                      data-testid={`toggle-${user.id}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="rows-per-page" className="text-sm">
              Rows per page:
            </label>
            <select
              id="rows-per-page"
              value={rowsPerPage}
              onChange={changeRowsPerPage}
              className="p-2 border rounded-md"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <Pagination
            size="medium"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                color: "white",
                backgroundColor: "#EB5757",
                "&:hover": {
                  backgroundColor: "#EB5757",
                },
              },
            }}
          />
        </div>
      </TableContainer>
    </>
  );
};

export default DataTable;
