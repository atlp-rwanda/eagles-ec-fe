import { useQuery } from "@tanstack/react-query";

import api from "../redux/api/api";

const fetchSingleProduct = async (id: number) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useFetchSingleProduct = (id: number) => useQuery({
  queryKey: ["fetchsingleproduct", id],
  queryFn: () => fetchSingleProduct(id),
  enabled: !!id,
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  staleTime: 0,
  gcTime: 0,
});
const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data.products;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useFetchProducts = () => useQuery({
  queryKey: ["fetchallproducts"],
  queryFn: fetchProducts,
  enabled: true,
  refetchOnMount: true,
  refetchOnWindowFocus: true,
  staleTime: 0,
  gcTime: 0,
});
