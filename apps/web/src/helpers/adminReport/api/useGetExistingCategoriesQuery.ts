import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetExistingCategoriesQuery = () => {
    const { data: existingCategories, refetch: refetchDataExistingCategories, isLoading } = useQuery({
        queryKey: ["existingCategories"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/report/existing-categories`);
            return res;
        },
    });
    return { existingCategories, refetchDataExistingCategories, isLoading };
}
