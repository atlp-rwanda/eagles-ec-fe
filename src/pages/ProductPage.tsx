import React, { useState, useEffect } from "react";
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
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

import ProductPageSkeleton from "../components/skeletons/ProductPageSkeleton";
import ProductCard from "../components/cards/ProductCard";
import { IProduct } from "../types";
import ProductFilter from "../components/common/filter/ProductFilter";
import { useFetchProducts } from "../libs/queries";
import { IOutletProps } from "../components/layouts/RootLayout";

const ProductPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const { searchQuery } = useOutletContext<IOutletProps>();
  const { data, isPending, error } = useFetchProducts();

  useEffect(() => {
    if (data) {
      setProducts(data);
      setFilteredProducts(data);
      gsap.fromTo(
        ".soleil2",
        {
          opacity: 0,
          y: 20,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power1.inOut",
          stagger: 0.2,
          yoyo: true,
          delay: 1,
        },
      );
    }
  }, [data]);

  if (isPending) {
    return <ProductPageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center my-[50px]">
        {error.message}
      </div>
    );
  }

  const handleFilter = (filtered: IProduct[]) => {
    setFilteredProducts(filtered);
    setCurrentPage(1);
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
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1);
  };

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        || product.category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, products]);

  return (
    <div>
      <ProductFilter products={products} onFilter={handleFilter} />

      <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 2 }}
        alignItems="center"
        className="mb-4"
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
        <Stack direction="row" spacing={2} justifyContent="center">
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
