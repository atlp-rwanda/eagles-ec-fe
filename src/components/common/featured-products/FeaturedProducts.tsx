import { Grid, Typography } from "@mui/material";

import ProductCardSkelton from "../../cards/ProductCardSkeleton";

const FeaturedProducts = () => (
  <div className="my-5">
    <div className="flex items-center gap-2">
      <p className=" w-5 h-9 bg-red-400 rounded-md" />
      <p className=" text-red-400">Our Products</p>
    </div>
    <Typography className=" py-3 font-bold" variant="h5">
      Featured Products
    </Typography>

    <Grid
      container
      spacing={{ xs: 1, sm: 1, md: 2 }}
      alignItems="center"
      className="mb-4"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <Grid key={i} item xs={6} sm={4} md={3}>
          <ProductCardSkelton value={i} />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default FeaturedProducts;
