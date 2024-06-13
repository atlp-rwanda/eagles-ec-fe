import { Grid, Typography } from "@mui/material";
// import ProductCardSkelton from "../../cards/ProductCardSkeleton";

const NewArrivals = () => (
  <div className="my-5">
    <div className="flex items-center gap-2">
      <p className=" w-5 h-9 bg-red-400 rounded-md" />
      <p className=" text-red-400">Our Products</p>
    </div>
    <Typography className=" py-3 font-bold" variant="h5">
      New Arrivals
    </Typography>

    <Grid container justifyItems="center" gap={2}>
      <Grid md={6} item>
        <img
          src="/images/premium.png"
          alt="helloimage-seen"
          className="h-full"
        />
      </Grid>
      <Grid md={6} container gap={2}>
        <Grid item md={12}>
          <img
            src="/images/premium.png"
            alt="helloimage-seen"
            className="h-full"
          />
        </Grid>
        <Grid container md={12} gap={2}>
          <Grid item md={6}>
            <img
              src="/images/premium.png"
              alt="helloimage-seen"
              className="h-full"
            />
          </Grid>
          <Grid item md={6}>
            <img
              src="/images/premium.png"
              alt="helloimage-seen"
              className="h-full"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default NewArrivals;
