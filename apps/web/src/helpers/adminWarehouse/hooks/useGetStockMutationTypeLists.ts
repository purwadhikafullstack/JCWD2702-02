import { useGetStockMutationTypeListsQuery } from "../api/useGetStockMutationTypeListsQuery";

export const useGetStockMutationTypeLists = (warehouseId: string) => {
    const { stockMutationTypeLists, refetchDataStockMutationTypeLists, isLoading } = useGetStockMutationTypeListsQuery(warehouseId);
    return {
        dataStockMutationTypeLists: stockMutationTypeLists?.data?.data,
        refetchDataStockMutationTypeLists,
        isLoading
    };
}