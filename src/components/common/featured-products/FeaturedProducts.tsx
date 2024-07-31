import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import ProductCardSkelton from "../../cards/ProductCardSkeleton";
import ProductCard from "../../cards/ProductCard";
import { useFetchProducts } from "../../../libs/queries";
import { IProduct } from "../../../types";
import api from "../../../redux/api/api";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  if (error) {
    return (
      <div className="my-5 px-4">
        <Typography className="p-3 font-bold" variant="h5">
          Featured Products
        </Typography>
        <p className=" flex justify-center items-center my-[50px]">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="my-5">
        <div className="flex items-center gap-2 p-3">
          <p className="w-5 h-9 bg-[#DB4444] rounded-md" />
          <p className="text-[#DB4444] font-medium">Our Products</p>
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
        <p className="w-5 h-9 bg-[#DB4444] rounded-md" />
        <p className="text-[#DB4444] font-medium">Our Products</p>
      </div>
      <Typography className="p-3 font-bold" variant="h5">
        Featured Products
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 2 }}
        alignItems="center"
        className="mb-4 px-4"
      >
        {products?.slice(0, 10).map((product: IProduct) => (
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
    </div>
  );
};

export default FeaturedProducts;
