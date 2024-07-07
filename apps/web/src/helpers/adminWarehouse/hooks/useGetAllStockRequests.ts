import { useGetAllStockRequestsQuery } from "../api/useGetAllStockRequestsQuery";

export const useGetAllStockRequests = () => {
    const { allStockRequests, refetchDataAllStockRequests, isLoading } = useGetAllStockRequestsQuery();

    return {
        dataAllStockRequests: allStockRequests?.data?.data,
        refetchDataAllStockRequests,
        isLoading
    };
}