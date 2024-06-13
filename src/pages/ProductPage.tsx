/* eslint-disable react/jsx-indent */
import React, {
  useState, useEffect, Suspense, lazy,
} from "react";
import { Grid } from "@mui/material";
import { gsap } from "gsap";

import ProductPageSkeleton from "../components/skeletons/ProductPageSkeleton";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts } from "../redux/api/productSlice";

const fetchData = () => new Promise((resolve) => setTimeout(resolve, 3000));
const ProductCard = lazy(() => fetchData().then(() => import("../components/cards/ProductCard")));

const ProductPage = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);

  useEffect(() => {
    fetchData().then(() => setLoading(false));
    dispatch(fetchProducts);
  }, []);

  useEffect(() => {
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
        // repeat:-1,
        delay: 1,
        // repeatDelay:1
      },
    );
  }, [loading]);

  return (
    <div>
      <Suspense fallback={<ProductPageSkeleton />}>
        <Grid
          container
          spacing={{ xs: 1, sm: 1, md: 2 }}
          alignItems="center"
          className="mb-4"
        >
          {products.map((_, i) => (
            <Grid key={i} item xs={6} sm={4} md={2.4} className="soleil2">
              <ProductCard />
            </Grid>
          ))}
        </Grid>
      </Suspense>
    </div>
  );
};

export default ProductPage;
