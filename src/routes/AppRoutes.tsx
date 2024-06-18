import { Route, Routes } from "react-router-dom";

import RootLayout from "../components/layouts/RootLayout";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import ProductPage from "../pages/ProductPage";
import RegisterUser from "../pages/RegisterUser";
import ProductDetails from "../pages/ProductDetails";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Homepage />} />
      <Route path="products" element={<ProductPage />} />
      <Route path="products/:id" element={<ProductDetails />} />
    </Route>
    <Route path="/register" element={<RegisterUser />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;
