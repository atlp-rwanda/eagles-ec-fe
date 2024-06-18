import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import HeaderInfo from "../common/header/Info";
import Navbar from "../common/header/Navbar";

export interface IOutletProps {
  searchQuery: string;
}

const RootLayout = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isHeaderInfoVisible, setIsHeaderInfoVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const headerInfo = document.getElementById("header-info");

      if (headerInfo) {
        const headerInfoRect = headerInfo.getBoundingClientRect();
        const scrollPosition = window.scrollY || window.pageYOffset;
        if (scrollPosition > headerInfoRect.bottom) {
          setIsSticky(true);
          setIsHeaderInfoVisible(false);
        } else {
          setIsSticky(false);
          setIsHeaderInfoVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`soleil ${isSticky ? "sticky top-0 z-50" : ""}`}>
        <div className="max-w-[1440px] lg:mx-auto lg:w-[90%] w-full">
          {isHeaderInfoVisible && <HeaderInfo />}
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="flex-1 max-w-[1440px] mx-auto lg:w-[90%] w-[100%]">
        <Outlet context={{ searchQuery } satisfies IOutletProps} />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
