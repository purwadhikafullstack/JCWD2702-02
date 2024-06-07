import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllProductCategoriesQuery = () => {
    const { data: productCategories } = useQuery({
        queryKey: ["productCategories"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:8000/categories");
            return res;
        },
    });
    return { productCategories };
}