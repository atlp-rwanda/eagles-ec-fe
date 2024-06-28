import { Grid } from "@mui/material";
import { FaTruck, FaHeadset, FaCheckCircle } from "react-icons/fa";

const CustomerService = () => (
  <Grid
    container
    className="flex justify-around items-center py-[100px]"
    spacing={2}
    data-testid="customer-service"
  >
    <Grid item xs={12} sm={6} md={4} data-testid="delivery">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-black p-4">
          <FaTruck className="text-white" size={24} />
        </div>
        <h3 className="font-bold text-lg mt-2">FREE AND FAST DELIVERY</h3>
        <p className="text-gray-500 text-sm">
          Free delivery for all orders over $140
        </p>
      </div>
    </Grid>
    <Grid item xs={12} sm={6} md={4} data-testid="customer-support">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-black p-4">
          <FaHeadset className="text-white" size={24} />
        </div>
        <h3 className="font-bold text-lg mt-2">24/7 CUSTOMER SERVICE</h3>
        <p className="text-gray-500 text-sm">Friendly 24/7 customer support</p>
      </div>
    </Grid>
    <Grid item xs={12} sm={6} md={4} data-testid="money-back-guarantee">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-black p-4">
          <FaCheckCircle className="text-white" size={24} />
        </div>
        <h3 className="font-bold text-lg mt-2">MONEY BACK GUARANTEE</h3>
        <p className="text-gray-500 text-sm">We return money within 30 days</p>
      </div>
    </Grid>
  </Grid>
);

export default CustomerService;
