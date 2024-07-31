import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { gsap } from "gsap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useOutletContext, useSearchParams } from "react-router-dom";

import ProductPageSkeleton from "../components/skeletons/ProductPageSkeleton";
import ProductCard from "../components/cards/ProductCard";
import { IProduct } from "../types";
import ProductFilter from "../components/common/filter/ProductFilter";
import { IOutletProps } from "../components/layouts/RootLayout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { handleSearchProduct } from "../redux/reducers/productsSlice";

const ProductPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const {
    searchQuery, showFilters, refetch, setRefetch,
  } = useOutletContext<IOutletProps>();

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      handleSearchProduct({
        name: "",
        minPrice: "0",
        maxPrice: "100000000000000000000",
        category: "",
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const name = searchParams.get("name") || "";
        const minPrice = searchParams.get("minPrice") || "0";
        const maxPrice = searchParams.get("maxPrice") || "100000000000000000000";
        const category = searchParams.get("category") || "";

        await dispatch(
          handleSearchProduct({
            name: searchQuery,
            minPrice,
            maxPrice,
            category,
          }),
        );
      } catch (error: any) {
        alert("error"); // eslint-disable-line no-alert
      }
    };
    fetchFilteredProducts();
  }, [searchParams, searchQuery, dispatch]);

  useEffect(() => {
    let filtered = data;

    const name = searchParams.get("name") || "";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(
      searchParams.get("maxPrice") || "100000000000000000000",
    );
    const category = searchParams.get("category") || "";

    if (name) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase()));
    }

    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );

    setFilteredProducts(filtered);
  }, [data, searchParams]);

  const handleFilter = (filtered: IProduct[]) => {
    setFilteredProducts(filtered);
    // setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
  };

  if (loading) {
    return (
      <>
        <ProductFilter products={data} onFilter={handleFilter} />
        <ProductPageSkeleton />
        ;
      </>
    );
  }
  if (error) {
    return (
      <div>
        <ProductFilter products={data} onFilter={handleFilter} />
        <p className=" flex items-center justify-center p-4">{error}</p>
      </div>
    );
  }

  return (
    <div className={`${!showFilters ? "mt-4" : ""}`}>
      <ProductFilter products={data} onFilter={handleFilter} />

      <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 2 }}
        alignItems="center"
        className="mb-4 px-4"
      >
        {currentItems.map((product) => (
          <Grid
            key={product.id}
            item
            xs={12}
            sm={4}
            md={2.4}
            className="soleil2"
          >
            <ProductCard product={product} />
          </Grid>
        ))}

        {searchQuery && currentItems.length < 1 && data.length < 1 && (
          <div className="flex w-full items-center justify-center py-[50px]">
            <p className=" text-center">No product found based on your query</p>
          </div>
        )}
      </Grid>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
      >
        <div className="flex items-center gap-1">
          <TextField
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            size="small"
            select
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </TextField>
        </div>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} justifyContent="center" />
          <Pagination
            size="small"
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default ProductPage;
