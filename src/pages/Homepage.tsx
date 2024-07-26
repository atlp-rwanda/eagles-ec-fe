import { Divider } from "@mui/material";

import HeroSection from "../components/common/hero/HeroSection";
import FeaturedProducts from "../components/common/featured-products/FeaturedProducts";
import NewArrivals from "../components/common/new-arrivals/NewArrivalProducts";
import CustomerService from "../components/common/customerservice/CustomerService";
import AdvertisedCategory from "../components/common/ads/AdvertisedCategory";

const Homepage = () => (
  <div className="mx-auto">
    <HeroSection />
    <FeaturedProducts />
    <AdvertisedCategory />
    <CustomerService />
  </div>
);

export default Homepage;
