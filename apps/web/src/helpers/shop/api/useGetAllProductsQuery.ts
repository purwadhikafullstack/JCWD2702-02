import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllProductsQuery = () => {
    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8000/products");
            return res;
        },
    });
    return { products };
}