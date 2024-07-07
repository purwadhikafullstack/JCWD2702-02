import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProductDetailQuery = (id: string) => {
    const { data: productDetail, refetch: refetchProductDetail } = useQuery({
        queryKey: ["productDetail"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/products/${id}`);
            return res;
        },
    });
    return { productDetail, refetchProductDetail };
}