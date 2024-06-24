import { Route, Routes } from "react-router-dom";

import RootLayout from "../components/layouts/RootLayout";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import OtpVerificationForm from "../pages/otpVerfication";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Homepage />} />
    </Route>
    <Route path="/register" element={<RegisterUser />} />
    <Route path="/login" element={<Login />} />
    <Route path="2fa-verify" element={<OtpVerificationForm />} />
  </Routes>
);

export default AppRoutes;
