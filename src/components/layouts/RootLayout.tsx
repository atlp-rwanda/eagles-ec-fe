import React, { SetStateAction, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";

import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import HeaderInfo from "../common/header/Info";
import Navbar from "../common/header/Navbar";
import BreadCrums from "../common/breadcrum/BreadCrum";

export interface IOutletProps {
  searchQuery: string;
  showFilters: boolean;
  refetch: boolean;
  setRefetch: React.Dispatch<SetStateAction<boolean>>;
}

const RootLayout = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isHeaderInfoVisible, setIsHeaderInfoVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [refetch, setRefetch] = useState(false);

  const handleRefect = () => {
    setRefetch(true);
  };

  const location = useLocation();

  const toggleFilters = () => {
    setShowFilters((state) => !state);
  };

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
    <div className="min-h-screen flex flex-col bg-white">
      <div className={`soleil ${isSticky ? "sticky top-0 z-50" : ""}`}>
        <div className="w-full">
          {isHeaderInfoVisible && <HeaderInfo />}
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setRefetch={setRefetch}
          />
        </div>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="flex-1 mx-auto lg:w-[90%] 2xl:max-w-[80%] w-[100%]">
        <BreadCrums showFilters={showFilters} toggleFilter={toggleFilters} />
        {location.pathname !== "/" && <Divider className="mb-3" />}
        <Outlet
          context={
            {
              searchQuery,
              showFilters,
              refetch,
              setRefetch,
            } satisfies IOutletProps
          }
        />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
