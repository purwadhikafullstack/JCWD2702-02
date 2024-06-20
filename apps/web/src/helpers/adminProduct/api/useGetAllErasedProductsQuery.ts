import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllErasedProductsQuery = () => {
    const { data: erasedProducts, refetch: refetchDataErasedProducts, isLoading } = useQuery({
        queryKey: ["erasedProducts"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/products/erased`);
            return res;
        },
    });
    return { erasedProducts, refetchDataErasedProducts, isLoading };
}