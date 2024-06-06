import { Route, Routes } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import Homepage from "../pages/Homepage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
