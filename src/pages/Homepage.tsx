import { Divider } from "@mui/material";

import HeroSection from "../components/common/hero/HeroSection";
import FeaturedProducts from "../components/common/featured-products/FeaturedProducts";
import NewArrivals from "../components/common/new-arrivals/NewArrivalProducts";

const Homepage = () => (
  <div className="mx-auto">
    <HeroSection />
    <Divider orientation="horizontal" className="my-4" />
    <FeaturedProducts />
    <NewArrivals />
  </div>
);

export default Homepage;
