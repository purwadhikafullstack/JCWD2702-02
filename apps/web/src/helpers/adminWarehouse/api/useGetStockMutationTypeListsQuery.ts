import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetStockMutationTypeListsQuery = (warehouseId: string) => {
    const { data: stockMutationTypeLists, refetch: refetchDataStockMutationTypeLists, isLoading } = useQuery({
        queryKey: ["stockMutationTypeLists"],
        queryFn: async () => {
            const dataStockMutationTypeLists = await axios.get(`http://localhost:8000/warehouse/mutation-types-lists/${warehouseId}`);
            return dataStockMutationTypeLists;
        },
    });
    return { stockMutationTypeLists, refetchDataStockMutationTypeLists, isLoading };
}