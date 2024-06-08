import { Outlet } from "react-router-dom";

import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

const RootLayout = () => (
  <div className="w-full min-w-full min-h-screen flex flex-col">
    <Header />
    <div className="flex-1 w-full">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default RootLayout;
