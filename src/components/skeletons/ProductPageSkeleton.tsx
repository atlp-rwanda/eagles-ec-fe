import { Grid } from "@mui/material";

import ProductCardSkelton from "../cards/ProductCardSkeleton";

const ProductPageSkeleton = () => (
  <div>
    <Grid
      container
      spacing={{ xs: 1, sm: 1, md: 2 }}
      alignItems="center"
      className="mb-4"
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <Grid key={i} item xs={6} sm={4} md={2.4}>
          <ProductCardSkelton value={i} />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default ProductPageSkeleton;
