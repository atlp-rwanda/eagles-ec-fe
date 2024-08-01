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
import SellerNotifications from "../dashboard/sellers/SellerNotifications";
import NotificationDetail from "../dashboard/sellers/NotificationDetail";
import { setNavigate } from "../redux/api/api";
import ChatPage from "../pages/ChatPage";
import BuyerWishesList from "../pages/Wishes";
import Wishes from "../dashboard/sellers/wishesList";
// import { setNavigateFunction } from "../redux/api/api";
import SellerOrder from "../components/dashboard/orders/SellerOrder";
import BuyerOrders from "../pages/BuyerOrders";
import SignupVerification from "../pages/SignupVerification";
import SmoothScroll from "../utils/SmoothScroll";
import NotFound from "../pages/NotFound";
import UserNotifications from "../components/common/user-notifications/UserNotifcations";
import UserNotificationDetail from "../components/common/user-notifications/UserNotificationDetail";
import { LogoutProvider } from "../components/dashboard/admin/LogoutContext";
import Payment, {
  CancelledPayment,
  SuccessfulPayment,
} from "../pages/paymentPage";

const AppRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
    // setNavigateFunction(navigate);
  }, [navigate]);
  const AlreadyLogged = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const decodedToken = token ? JSON.parse(atob(token!.split(".")[1])) : {};
    const tokenIsValid = decodedToken.id && decodedToken.roleId;
    const isSeller = decodedToken.roleId === 2;
    useEffect(() => {
      if (tokenIsValid) {
        isSeller ? navigate("/dashboard") : navigate("/");
      }
    }, [tokenIsValid, navigate]);

    return tokenIsValid ? null : children;
  };
  return (
    <SmoothScroll>
      <LogoutProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Homepage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="/carts" element={<CartManagement />} />
            <Route path="/wishes" element={<BuyerWishesList />} />
            <Route path="/orders" element={<BuyerOrders />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment/success" element={<SuccessfulPayment />} />
            <Route path="/payment/canceled" element={<Payment />} />
            <Route path="/notifications" element={<UserNotifications />} />
            <Route
              path="/notifications/:id"
              element={<UserNotificationDetail />}
            />
          </Route>
          <Route path="chat" element={<ChatPage />} />
          <Route path="/password-reset-link" element={<GetLinkPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/verify-user" element={<SignupVerification />} />

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
          <Route path="/dashboard/orders" element={<SellerOrder />} />
          <Route path="/admin/dashboard" element={<UserManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/Products" element={<Products />} />
          <Route
            path="/dashboard/notifications"
            element={<SellerNotifications />}
          />
          <Route
            path="/dashboard/notifications/:id"
            element={<NotificationDetail />}
          />
          <Route path="/dashboard/wishes" element={<Wishes />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </LogoutProvider>
    </SmoothScroll>
  );
};
export default AppRoutes;
