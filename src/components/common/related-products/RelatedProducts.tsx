import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import api from "../../../redux/api/api";
import { IProduct } from "../../../types";
import ProductCard from "../../cards/ProductCard";
import ProductCardSkelton from "../../cards/ProductCardSkeleton";

interface IProductCtegory {
  category: string;
  currentP: string;
}

const RelatedProducts: React.FC<IProductCtegory> = ({ category, currentP }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState("");
  const [relatedProd, setRelatedProd] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/products");

        const products = res.data.products as IProduct[];
        setRelatedProd(
          products
            .filter(
              (p) => p.category.name.toLowerCase() === category.toLowerCase(),
            )
            .filter((p) => p.name.toLowerCase() !== currentP.toLowerCase()),
        );

        if (relatedProd?.length < 5) {
          const otherCat = products.filter(
            (p) => p.category.name.toLowerCase() !== category.toLowerCase(),
          );
          setRelatedProd([...relatedProd, ...otherCat]);
        }

        setIsloading(false);
      } catch (error: any) {
        setError(error.message);
        setIsloading(false);
      } finally {
        setIsloading(false);
      }
    };
    fetch();
  }, []);

  if (isLoading) {
    return (
      <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 2 }}
        alignItems="center"
        data-testid="product-card-skeleton"
        className="mb-4"
      >
        {Array.from({ length: 5 }).map((_, index) => (
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
    );
  }
  return (
    <div className="my-4">
      <h4 className="mb-4">Related Products</h4>

      <Grid
        container
        spacing={{ xs: 1, sm: 1, md: 2 }}
        alignItems="center"
        className="mb-4 px-4"
      >
        {relatedProd.slice(0, 5).map((product) => (
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

export default RelatedProducts;
