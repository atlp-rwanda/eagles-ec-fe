import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
