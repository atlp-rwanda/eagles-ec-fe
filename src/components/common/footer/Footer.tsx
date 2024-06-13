import { Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => (
  <div className="w-full bg-black text-white p-4">
    <div className="max-w-[1440px] w-[90%] mx-auto py-5">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="mb-2">
            Our Contacts
          </Typography>
          <Typography variant="body2">eagles</Typography>
          <Typography variant="body2">+250 780 693 425</Typography>
          <Typography variant="body2">eagles.ec@gmail.com</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="mb-2">
            Categories
          </Typography>
          <Typography variant="body2">Computers and tablets</Typography>
          <Typography variant="body2">Mobile phones & accessories</Typography>
          <Typography variant="body2">Home Furnitures</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="mb-2">
            Quick Links
          </Typography>
          <Typography variant="body2">About us</Typography>
          <Typography variant="body2">Contact</Typography>
          <Typography variant="body2">Forum</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="mb-2">
            Support
          </Typography>
          <Typography variant="body2">Guide</Typography>
          <Typography variant="body2">Request info</Typography>
          <Typography variant="body2">Join us</Typography>
        </Grid>
      </Grid>
      <div className="flex justify-center mt-6 space-x-4">
        <NavLink href="#" className="text-white">
          <FaFacebookF />
        </NavLink>
        <NavLink href="#" className="text-white">
          <FaInstagram />
        </NavLink>
        <NavLink href="#" className="text-white">
          <FaTwitter />
        </NavLink>
        <NavLink href="#" className="text-white">
          <FaLinkedinIn />
        </NavLink>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-4 text-center">
        <Typography variant="body2" className="mb-2">
          Terms & conditions Cookies Policy Privacy Accessibility
        </Typography>
        <Typography variant="body2">
          &copy; 2024 eagles ec. All rights reserved.
        </Typography>
      </div>
    </div>
  </div>
);

export default Footer;
