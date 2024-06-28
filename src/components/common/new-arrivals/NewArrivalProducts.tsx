import { Grid, Typography } from "@mui/material";
// import ProductCardSkelton from "../../cards/ProductCardSkeleton";

const NewArrivals = () => (
  <div className="my-5 p-3">
    <div className="flex items-center gap-2">
      <p className=" w-5 h-9 bg-red-400 rounded-md" />
      <p className=" text-red-400">Our Products</p>
    </div>
    <Typography className=" py-3 font-bold" variant="h5">
      New Arrivals
    </Typography>

    <Grid container spacing={2}>
      <Grid item xs={12} md={6} className="h-[300px]">
        <div className="bg-orange-300 px-4 py-2 rounded-md h-full">
          xs=12 md=6
        </div>
      </Grid>

      <Grid item xs={12} md={6} className="h-[300px]">
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} className="h-[150px]">
            <div className="bg-orange-300 px-4 py-2 rounded-md">xs=12</div>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <div className="bg-orange-300 px-4 py-2 rounded-md">
                  xs=6 md=6
                </div>
              </Grid>

              <Grid item xs={6} md={6}>
                <div className="bg-orange-300 px-4 py-2 rounded-md">
                  xs=6 md=6
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default NewArrivals;
