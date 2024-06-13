import { Outlet } from "react-router-dom";

import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import HeaderInfo from "../common/header/Info";
import Navbar from "../common/header/Navbar";

const RootLayout = () => (
  <div className="min-h-screen flex flex-col">
    <div className="max-w-[1440px] lg:mx-auto lg:w-[90%] w-full">
      <HeaderInfo />
      <Header />
    </div>
    <Navbar />
    <div className="flex-1 max-w-[1440px] mx-auto lg:w-[90%] w-[100%]">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default RootLayout;
