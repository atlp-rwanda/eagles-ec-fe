import { IconButton, Stack, TextField } from "@mui/material";
import React, {
  SetStateAction, useEffect, useRef, useState,
} from "react";
import { FaSearch } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { LiaAngleDownSolid } from "react-icons/lia";
import { IoMdMenu } from "react-icons/io";
import { FaAngleDown, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";

import ClientSidbarDrawer from "../drawrers/ClientSidbarDrawer";
import { RootState } from "../../../redux/store";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchCategories } from "../../../redux/reducers/categoriesSlice";

interface InavbarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
}

const Navbar: React.FC<InavbarProps> = ({ searchQuery, setSearchQuery }) => {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.categories.data);
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      navigate("/products");
    } else {
      navigate(`/products?category=${category}`);
    }
  };

  const handleHomeClick = () => {
    setActiveCategory("All");
    navigate("/");
  };

  const categoriesRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#DB4444] px-[5%] 2xl:px-[8%] py-4">
      <div className="flex items-center gap-2 w-full">
        <div className="hidden lg:flex text-md items-center gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "text-white font-bold" : "text-white")}
            onClick={handleHomeClick}
          >
            Home
          </NavLink>
        </div>
        <ul
          className="flex lg:ml-2 items-center lg:justify-center categories-list w-full categories-list gap-3 text-white overflow-x-scroll"
          ref={categoriesRef}
        >
          <li
            className={`lg:hidden whitespace-nowrap cursor-pointer ${
              activeCategory === "All" ? "active-category" : ""
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </li>
          {categories.map((category: any) => (
            <li
              key={category.id}
              className={` test-[13px] whitespace-nowrap cursor-pointer ${
                activeCategory === category.name ? "active-category" : ""
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
        <div className="flex items-center border-l pl-1 gap-2">
          <FaAngleLeft
            className="text-white cursor-pointer"
            onClick={scrollLeft}
          />
          <FaAngleRight
            className="text-white cursor-pointer"
            onClick={scrollRight}
          />
        </div>
      </div>
      <ClientSidbarDrawer open={open} handleClose={handleClose} />
    </div>
  );
};

export default Navbar;
