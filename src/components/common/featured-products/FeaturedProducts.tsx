import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ProductCardSkelton from "../../cards/ProductCardSkeleton";
import ProductCard from "../../cards/ProductCard";
import { useFetchProducts } from "../../../libs/queries";
import { IProduct } from "../../../types";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const { data, isPending, error } = useFetchProducts();

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, []);

  if (error) {
    return (
      <div className="my-5 px-4">
        <Typography className="p-3 font-bold" variant="h5">
          Featured Products
        </Typography>
        <p className=" flex justify-center items-center my-[50px]">
          {error.message}
        </p>
      </div>
    );
  }

  if (data?.lenght < 1) {
    return (
      <div className="my-5 px-4">
        <Typography className="p-3 font-bold" variant="h5">
          Featured Products
        </Typography>
        <p className=" flex justify-center items-center my-[50px]">
          no product found
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="my-5">
        <div className="flex items-center gap-2 p-3">
          <p className="w-5 h-9 bg-red-400 rounded-md" />
          <p className="text-red-400">Our Products</p>
        </div>
        <Typography className="p-3 font-bold" variant="h5">
          Featured Products
        </Typography>
        <Grid
          container
          spacing={{ xs: 1, sm: 1, md: 2 }}
          alignItems="center"
          data-testid="product-card-skeleton"
          className="mb-4"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid
              key={`skeleton-${index}`}
              item
              xs={12}
              sm={4}
              md={2.4}
              className="soleil2"
            >
              <ProductCardSkelton value={2} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  return (
    <div className="my-5">
      <div className="flex items-center gap-2 p-3">
        <p className="w-5 h-9 bg-red-400 rounded-md" />
        <p className="text-red-400">Our Products</p>
      </div>
      <Typography className="p-3 font-bold" variant="h5">
        Featured Products
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 2 }}
        alignItems="center"
        className="mb-4"
      >
        {products?.slice(0, 8).map((product: IProduct) => (
          <Grid
            key={product.id}
            item
            xs={6}
            sm={4}
            md={2.4}
            className="soleil2"
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {!products && (
        <p className=" flex justify-center items-center my-[50px]">
          {data.length}
        </p>
      )}
    </div>
  );
};

export default FeaturedProducts;
