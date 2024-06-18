import { useQuery } from "@tanstack/react-query";

import api from "../redux/api/api";

const fetchSingleProduct = async (id: number) => {
  try {
    const res = await api.get(`/api/v1/products/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useFetchSingleProduct = (id: number) => useQuery({
  queryKey: ["product", id],
  queryFn: async () => fetchSingleProduct(id),
  enabled: !!id,
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  staleTime: 0,
});
const fetchProducts = async () => {
  try {
    const res = await api.get("/api/v1/products");
    return res.data.products;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useFetchProducts = () => useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
  enabled: true,
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  staleTime: 0,
});
