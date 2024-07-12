import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import RootLayout from "../components/layouts/RootLayout";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import ProductPage from "../pages/ProductPage";
import RegisterUser from "../pages/RegisterUser";
import ProductDetails from "../pages/ProductDetails";
import OtpVerificationForm from "../pages/otpVerfication";
import GetLinkPage from "../pages/GetLinkPage";
import ResetPassword from "../pages/ResetPassword";
import SellerDashboard from "../dashboard/sellers/Index";
import AddProduct from "../dashboard/sellers/AddProduct";
import UpdatePasswordPage from "../pages/passwordUpdatePage";
import UsersProfile from "../pages/userProfile";
import UpdateUserProfile from "../pages/updateProfile";
import Products from "../dashboard/sellers/Products";
import UserManagement from "../dashboard/admin/UserManagement";
import Settings from "../dashboard/admin/Settings";
import Analytics from "../dashboard/admin/Analytics";
import Dashboard from "../dashboard/admin/Dashboard";
import CartManagement from "../pages/CartManagement";
import { setNavigateFunction } from "../redux/api/api";

const AppRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  const AlreadyLogged = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const decodedToken = token ? JSON.parse(atob(token!.split(".")[1])) : {};
    const tokenIsValid = !!(decodedToken.id && decodedToken.roleId);
    const isSeller = decodedToken.roleId === 2;

    useEffect(() => {
      if (tokenIsValid) {
        isSeller ? navigate("/dashboard") : navigate("/");
      }
    }, [tokenIsValid, navigate]);

    return tokenIsValid ? null : children;
  };

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:id" element={<ProductDetails />} />
      </Route>
      <Route path="/carts" element={<CartManagement />} />
      <Route path="/password-reset-link" element={<GetLinkPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route
        path="/login"
        element={(
          <AlreadyLogged>
            <Login />
          </AlreadyLogged>
        )}
      />
      <Route path="2fa-verify" element={<OtpVerificationForm />} />
      <Route path="/dashboard" element={<SellerDashboard />} />
      <Route path="/dashboard/addproduct" element={<AddProduct />} />
      <Route path="/update-password" element={<UpdatePasswordPage />} />
      <Route path="/profile" element={<UsersProfile />} />
      <Route path="/profile/update" element={<UpdateUserProfile />} />
      <Route path="/dashboard/products" element={<Products />} />
      <Route path="/dashboard/products/:id" element={<AddProduct />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/analytics" element={<Analytics />} />
      <Route path="/admin/Products" element={<Products />} />
    </Routes>
  );
};

export default AppRoutes;
