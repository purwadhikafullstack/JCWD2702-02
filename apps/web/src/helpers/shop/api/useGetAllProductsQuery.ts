import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllProductsQuery = (queryParams: any) => {
    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const queryString = new URLSearchParams(queryParams).toString();
            console.log("QUERY STRING IN API", queryString)
            const res = await axios.get(`http://localhost:8000/products?${queryString}`);
            return res;
        },
    });
    return { products };
}