import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetExistingProductsQuery = () => {
    const { data: existingProducts, refetch: refetchDataExistingProducts, isLoading } = useQuery({
        queryKey: ["existingProducts"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/report/existing-products`);
            return res;
        },
    });
    return { existingProducts, refetchDataExistingProducts, isLoading };
}