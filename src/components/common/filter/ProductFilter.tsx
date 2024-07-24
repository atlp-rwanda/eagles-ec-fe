import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";

import { ICategory, IProduct } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchCategories } from "../../../redux/reducers/categoriesSlice";
import { fetchProducts } from "../../../redux/reducers/productsSlice";
import api from "../../../redux/api/api";

interface IProductFilterProps {
  products: IProduct[];
  onFilter: (filteredProducts: IProduct[]) => void;
}

interface IRanges {
  min: number | null;
  max: number | null;
}

const ProductFilter: React.FC<IProductFilterProps> = ({
  products,
  onFilter,
}) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 100000000000000,
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [cat, setCat] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams({
    minPrice: "0",
    maxPrice: "",
    category: "",
  });
  const [ranges, setRanges] = useState<IRanges>({
    min: null,
    max: null,
  });

  const dispatch = useAppDispatch();

  const { data, error } = useAppSelector((state) => state.categories);
  const { loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (!Array.isArray(products)) {
      return;
    }
    const filterProducts = () => {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
          && product.price >= priceRange[0]
          && product.price <= priceRange[1]
          && (selectedCategories.length === 0
            || selectedCategories.includes(product.category.name)),
      );

      if (sort === "priceLowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === "priceHighToLow") {
        filtered.sort((a, b) => b.price - a.price);
      }

      onFilter(filtered);
    };

    filterProducts();
  }, [query, sort, priceRange, selectedCategories, products, onFilter]);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCat(value);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value === "All") {
        const unique = localStorage.getItem("uniqueCat");
        const cats = unique && JSON.parse(unique);
        setCategories(cats);
        newParams.delete("category");
        dispatch(fetchProducts);
      } else {
        newParams.set("category", value);
      }
      return newParams;
    });
  };

  const handleRangesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      const numericValue = value === "" ? null : Number(value);
      setRanges((prev) => ({ ...prev, [name]: numericValue }));
    }
  };

  const handleSetParams = () => {
    const newParams: Record<string, string> = {};

    if (ranges.min !== null) {
      newParams.minPrice = ranges.min.toString();
    }
    if (ranges.max !== null) {
      newParams.maxPrice = ranges.max.toString();
    }

    if (ranges.max !== null && ranges.min !== null && ranges.min > ranges.max) {
      setIsError(true);
      return;
    }

    setSearchParams(newParams);
  };

  return (
    <div className="filters p-4">
      <div className="flex flex-wrap justify-between">
        <div className="space-y-2">
          <h5 className="text-lg font-bold" data-testid="SORT BY">
            SORT BY
          </h5>
          <div>
            <label>
              <input
                type="radio"
                className="mr-1"
                value="popularity"
                checked={sort === "popularity"}
                onChange={handleSortChange}
              />
              Popularity
            </label>
            <br />
            <label>
              <input
                type="radio"
                className="mr-1"
                value="newness"
                checked={sort === "newness"}
                onChange={handleSortChange}
              />
              Newness
            </label>
            <br />
            <label>
              <input
                type="radio"
                className="mr-1"
                value="priceLowToHigh"
                checked={sort === "priceLowToHigh"}
                onChange={handleSortChange}
              />
              Price: Low to high
            </label>
            <br />
            <label>
              <input
                type="radio"
                className="mr-1"
                value="priceHighToLow"
                checked={sort === "priceHighToLow"}
                onChange={handleSortChange}
              />
              Price: High to low
            </label>
          </div>
        </div>
        <div className="space-y-2 w-full sm:w-[300px]">
          <h5 className="text-lg font-bold " data-testid="PRICE FILTER">
            PRICE FILTER
          </h5>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-[300px]">
            <Stack className="flex-1 gap-2" direction="row">
              <TextField
                label={
                  ranges.max !== null
                  && ranges.min !== null
                  && ranges.min > ranges.max
                    ? "Inavlid Query"
                    : "Min Price"
                }
                // @ts-ignore
                color={
                  ranges.max !== null
                  && ranges.min !== null
                  && ranges.min > ranges.max
                    ? "error"
                    : ""
                }
                name="min"
                size="small"
                variant="outlined"
                value={ranges.min !== null ? ranges.min : ""}
                onChange={handleRangesChange}
                fullWidth
              />
              <TextField
                label="Max Price"
                name="max"
                size="small"
                variant="outlined"
                value={ranges.max !== null ? ranges.max : ""}
                onChange={handleRangesChange}
                fullWidth
              />
            </Stack>
            <Button
              variant="contained"
              disabled={
                !!(
                  ranges.max !== null
                  && ranges.min !== null
                  && ranges.min > ranges.max
                )
              }
              color="error"
              className=" hover:bg-[#DB4444] active:bg-[#DB4444]"
              sx={{
                width: { xs: "100%", sm: "100%", md: "30px" },
                background: "#DB4444",
              }}
              onClick={handleSetParams}
              size="medium"
            >
              <BiSearch className="text-white text-[27px]" />
            </Button>
          </div>
        </div>
        <div className="space-y-2 w-full sm:w-[300px]">
          <h5 className="text-lg font-bold" data-testid="Filter By Category">
            FILTER BY CATEGORY
          </h5>
          {/* {loading && <p>Loading categories...</p>}
          {isError && <p>Error fetching categories</p>} */}

          <TextField
            select
            label="Category"
            focused
            size="small"
            onChange={handleCategoryChange}
            className=" w-full sm:w-[300px]"
            value={cat}
          >
            <MenuItem value="All">{loading ? "Loading..." : "All"}</MenuItem>
            {!error ? (
              categories.map((category, i) => (
                <MenuItem key={i} value={category.name}>
                  {category.name}
                </MenuItem>
              ))
            ) : (
              <div className="p-3 max-w-[300px] text-center">
                Failed to fetch category wait until backedn PR is merged
              </div>
            )}
          </TextField>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductFilter;
